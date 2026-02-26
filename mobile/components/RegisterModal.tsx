import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const MIN_NAME_LENGTH = 4;

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (userName: string) => Promise<void>;
}

export default function RegisterModal({
  visible,
  onClose,
  onSubmit,
}: RegisterModalProps) {
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameError =
    touched && (name.trim().length < MIN_NAME_LENGTH || !name.trim())
      ? name.trim().length === 0
        ? 'Required'
        : `Must be at least ${MIN_NAME_LENGTH} characters`
      : null;
  const isValid = name.trim().length >= MIN_NAME_LENGTH;

  async function handleSubmit() {
    setTouched(true);
    if (!isValid) return;

    setLoading(true);
    setError(null);
    try {
      await onSubmit(name.trim());
      setName('');
      setTouched(false);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    if (!loading) {
      setName('');
      setTouched(false);
      setError(null);
      onClose();
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <Pressable style={styles.box} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Register for the lotteries</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={[styles.input, nameError && styles.inputError]}
              value={name}
              onChangeText={setName}
              onBlur={() => setTouched(true)}
              placeholder="Enter your name"
              placeholderTextColor="#999"
              editable={!loading}
              autoCapitalize="words"
            />
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : null}
          </View>

          {error ? (
            <Text style={styles.submitError}>{error}</Text>
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

          <Pressable
            style={styles.cancelButton}
            onPress={handleClose}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  box: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6200ee',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6200ee',
    marginBottom: 20,
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
    marginBottom: 12,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#6200ee',
    fontSize: 14,
  },
});
