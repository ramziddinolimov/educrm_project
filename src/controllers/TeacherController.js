const permissionChecker = require('../helpers/permissionChecker')
const Validations = require('../modules/validations')

module.exports = class TeacherController {
    static async TeacherCreatePostController(req, res, next) {
        try{
        permissionChecker("admin", req.user_permissions, res.error);

        const data = await Validations.AddTeacherValidation(
            req.body,
            res.error
        );

        const teacher = await req.db.teachers.create({
            user_id: data.user_id,
            teacher_phone: data.phone,
            teacher_skills: data.skills,
        });

        res.status(201).json({
            ok: true,
            message: "Teacher created successfully",
        });
    } catch (error) {
        if (error.message == "Validation error") {
            error.message = "This user is already a teacher";
            error.errorCode = 400;
        }
        next(error);
        }
    }

    static async TeacherUpdatePutController(req, res, next) {
        try {
            permissionChecker("admin", req.user_permissions, res.error)
            const teacher_id = req.params.teacher_id;
            const teacher = await req.db.teachers.findOne({
                where: {teacher_id,},
            });

            if (!teacher) throw new res.error(404, "Teacher not found");

            const data = await Validations.AddTeacherValidation(
                req.body,
                res.error
            );

            await req.db.teachers.update(
                {
                    user_id: data.user_id,
                    teacher_phone: data.phone,
                    teacher_skills: data.skills,
                },
                {
                    where: {teacher_id,},
                }
            );

            res.status(200).json({
                ok: true,
                message: "Updated successfully",
            });
            
        } catch (error) {
            next(error);
        }
    }


    static async TeacherGetController(req, res, next) {
        try {
            const limit = req.query.limit || 15;
            const offset = req.query.offset - 1 || 0;

            const teachers = await req.db.teachers.findAll({
                raw: true,
                include: [
                    {
                        model: req.db.users,
                        attributes: {exclude: ["user_password"],},
                    },
                ],
                limit,
                offset: offset * limit,
            })

            res.json({
                ok: true,
                message: "Teachers",
                data: teachers,
            })
        } catch (error) {
            next(error);
        }
    }
}

