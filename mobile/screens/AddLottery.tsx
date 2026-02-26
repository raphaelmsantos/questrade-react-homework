import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createLottery } from '../services/LotteryService';

const MIN_LENGTH = 4;

function validateName(name: string): string | null {
  if (!name.trim()) return 'Required';
  if (name.length < MIN_LENGTH) return `Must be at least ${MIN_LENGTH} characters`;
  return null;
}

function validatePrize(prize: string): string | null {
  if (!prize.trim()) return 'Required';
  if (prize.length < MIN_LENGTH) return `Must be at least ${MIN_LENGTH} characters`;
  return null;
}

export default function AddLotteryScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [prize, setPrize] = useState('');
  const [touchedName, setTouchedName] = useState(false);
  const [touchedPrize, setTouchedPrize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nameError = touchedName ? validateName(name) : null;
  const prizeError = touchedPrize ? validatePrize(prize) : null;
  const isValid = !validateName(name) && !validatePrize(prize);

  async function handleSubmit() {
    setTouchedName(true);
    setTouchedPrize(true);
    const nameErr = validateName(name);
    const prizeErr = validatePrize(prize);
    if (nameErr || prizeErr) return;

    setLoading(true);
    setSubmitError(null);
    try {
      await createLottery({
        name: name.trim(),
        prize: prize.trim(),
        type: 'simple',
      });
      navigation.goBack();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Add a new Lottery</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Lottery Name</Text>
          <TextInput
            style={[styles.input, nameError && styles.inputError]}
            value={name}
            onChangeText={setName}
            onBlur={() => setTouchedName(true)}
            placeholder="Enter lottery name"
            placeholderTextColor="#999"
            editable={!loading}
            autoCapitalize="words"
          />
          {nameError ? (
            <Text style={styles.errorText}>{nameError}</Text>
          ) : null}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Prize Amount</Text>
          <TextInput
            style={[styles.input, prizeError && styles.inputError]}
            value={prize}
            onChangeText={setPrize}
            onBlur={() => setTouchedPrize(true)}
            placeholder="Enter prize amount"
            placeholderTextColor="#999"
            editable={!loading}
            keyboardType="default"
          />
          {prizeError ? (
            <Text style={styles.errorText}>{prizeError}</Text>
          ) : null}
        </View>

        {submitError ? (
          <Text style={styles.submitError}>{submitError}</Text>
        ) : null}

        <Pressable
          style={[
            styles.submitButton,
            (!isValid || loading) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!isValid || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#6200ee',
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6200ee',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#6200ee',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  inputError: {
    borderColor: '#b00020',
  },
  errorText: {
    fontSize: 12,
    color: '#b00020',
    marginTop: 4,
  },
  submitError: {
    fontSize: 14,
    color: '#b00020',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
