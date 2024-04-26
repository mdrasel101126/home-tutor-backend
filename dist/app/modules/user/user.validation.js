"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        fullName: zod_1.z.string({
            required_error: 'fullName is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'email is required',
        })
            .email({ message: 'Invalid email format' }),
        phoneNumber: zod_1.z.string({
            required_error: 'phoneNumber is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    })
        .strict(),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        fullName: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
    })
        .strict(),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New password is required',
        }),
    })
        .strict(),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
<<<<<<< HEAD
const createCustomerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        role: zod_1.z.enum([...user_constants_1.userRole]).optional(),
        password: zod_1.z.string({
            required_error: "Passsword is required",
        }),
        profileImg: zod_1.z.string().optional(),
        customer: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: "First names is required",
                }),
                lastName: zod_1.z.string({
                    required_error: "Last name is required",
                }),
            }, {
                required_error: "Name is required",
            }),
            email: zod_1.z.string({
                required_error: "Email is required",
            }),
            division: zod_1.z.string({
                required_error: "Division is required",
            }),
            district: zod_1.z.string({
                required_error: "District is required",
            }),
            policeStation: zod_1.z.string({
                required_error: "Police Station is required",
            }),
            contactNo: zod_1.z.string({
                required_error: "Contact No is required",
            }),
            profileImg: zod_1.z.string().optional(),
        }, {
            required_error: "Customer is Reequired",
=======
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
>>>>>>> 3ed703440065482e8dcc4c18cd46ffab1b180ede
        }),
    }),
});
const changeRoleZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        role: zod_1.z.enum([...user_constant_1.userRoles], {
            required_error: 'role is required',
        }),
<<<<<<< HEAD
        role: zod_1.z.enum([...user_constants_1.userRole]).optional(),
        password: zod_1.z.string({
            required_error: "Passsword is required",
        }),
        profileImg: zod_1.z.string().optional(),
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: "First names is required",
                }),
                lastName: zod_1.z.string({
                    required_error: "Last name is required",
                }),
            }, {
                required_error: "Name is required",
            }),
            email: zod_1.z.string({
                required_error: "Email is required",
            }),
            division: zod_1.z.string({
                required_error: "Division is required",
            }),
            district: zod_1.z.string({
                required_error: "District is required",
            }),
            policeStation: zod_1.z.string({
                required_error: "Police Station is required",
            }),
            contactNo: zod_1.z.string({
                required_error: "Contact No is required",
            }),
            profileImg: zod_1.z.string().optional(),
        }, {
            required_error: "Admin is Reequired",
        }),
    }),
});
const createTutorZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        profileImg: zod_1.z.string().optional(),
        tutor: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: "First names is required",
                }),
                lastName: zod_1.z.string({
                    required_error: "Last name is required",
                }),
            }, {
                required_error: "Name is required",
            }),
            email: zod_1.z.string({
                required_error: "Email is required",
            }),
            contactNo: zod_1.z.string({
                required_error: "Contact No is required",
            }),
            division: zod_1.z.string({
                required_error: "Division is requried",
            }),
            district: zod_1.z.string({
                required_error: "District is requried",
            }),
            policeStation: zod_1.z.string({
                required_error: "Police station is requried",
            }),
            sallaryRange: zod_1.z.string({
                required_error: "Salary Range is requried",
            }),
            tutionArea: zod_1.z.array(zod_1.z.string({
                required_error: "Tution area is required",
            })),
            isAvailable: zod_1.z.boolean().optional(),
            role: zod_1.z.enum([...user_constants_1.userRole]).optional(),
            description: zod_1.z.string({
                required_error: "Description is required",
            }),
            educationQualification: zod_1.z.string({
                required_error: "Education qualification is required",
            }),
            institutionName: zod_1.z.string({
                required_error: "Education name is required",
            }),
            preferedClasses: zod_1.z.array(zod_1.z.string({
                required_error: "Tution area is required",
            })),
            preferedSubjects: zod_1.z.array(zod_1.z.string({
                required_error: "Tution area is required",
            })),
            profileImg: zod_1.z.string().optional(),
        }, {
            required_error: "Tutor is required",
        }),
    }),
=======
    })
        .strict(),
>>>>>>> 3ed703440065482e8dcc4c18cd46ffab1b180ede
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
    changePasswordZodSchema,
    changeRoleZodSchema,
};
