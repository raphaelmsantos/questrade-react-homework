import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createLottery } from "../services/LotteryService";

const addLotterySchema = Yup.object({
    name: Yup.string().min(4).required(),
    prize: Yup.string().min(4).required(),
});

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export default function AddLotteryModal({ open, onClose, onSubmit }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formik = useFormik({
     validationSchema: addLotterySchema,
     initialValues: {
       name: '',
       prize: '',
     },     
     onSubmit: async (values) => {
        setLoading(true);
        try { 
            await createLottery({
                name: values.name,
                prize: values.prize,
                type: 'simple',
            });
            setLoading(false);
            onSubmit();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
     },
   });  

    function handleClose(event: {}, reason: "backdropClick" | "escapeKeyDown"): void {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
            onClose();
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={(theme) => ({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: theme.palette.background.paper,
                border: `2px solid ${theme.palette.primary.main}`,
                boxShadow: 24,
                p: 4,
            })}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    Add a new Lottery
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Lottery Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    sx={(theme) => ({
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: theme.palette.primary.main },
                            '&:hover fieldset': { borderColor: theme.palette.primary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                        },
                        '& .MuiInputLabel-root': { color: theme.palette.primary.main },
                        '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.primary.main },
                        '& .MuiOutlinedInput-input': { color: theme.palette.primary.main },
                    })}
                    error={Boolean(formik.errors.name && formik.touched.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    label="Prize Amount"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    id="prize"
                    name="prize"
                    value={formik.values.prize}
                    onChange={formik.handleChange}
                    sx={(theme) => ({
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: theme.palette.primary.main },
                            '&:hover fieldset': { borderColor: theme.palette.primary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                        },
                        '& .MuiInputLabel-root': { color: theme.palette.primary.main },
                        '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.primary.main },
                        '& .MuiOutlinedInput-input': { color: theme.palette.primary.main },
                    })}
                    error={Boolean(formik.errors.prize && formik.touched.prize)}
                    helperText={formik.touched.prize && formik.errors.prize}
                />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    fullWidth
                    sx={{ backgroundColor: 'primary.main', color: 'text.primary', '&:hover': { backgroundColor: 'primary.main' } }}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
                </form>
                {error && (
                    <Typography sx={{ color: 'red', mt: 1 }}>{error}</Typography>
                )}
            </Box>
        </Modal>
    );
}