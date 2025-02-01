import {z} from "zod";

export const signUpValidationSchema = z.object({
    email: z.string().email("Invalid email format").nonempty(" Email is required"),
    password: z.string().nonempty("Password is required").min(6, " Password must be at least 6 characters"),
    name: z.string().nonempty("Name is required").min(3, " Name must be at least 3 characters"),
    lastName: z.string().nonempty("Last name is required").min(3, " Last name must be at least 3 characters"),
});