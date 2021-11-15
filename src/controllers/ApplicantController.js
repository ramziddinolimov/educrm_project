const permissionChecker = require('../helpers/permissionChecker');
const { AddApplicantValidation, UpdateApplicantValidation } = require('../modules/validations')

module.exports = class AddApplicantController {
    static async ApplicantGetController(req, res, next) {
        try {
            permissionChecker(
                ["admin", "operator"],
                req.user_permissions,
                res.error
            );

            const limit = req.query.limit || 15;
            const offset = req.query.offset - 1 || 0;

            const applicants = await req.db.applicants.findAll({ 
                limit,
                offset: offset * 15,
                include: [
                    {
                        model: req.db.users,
                    },
                    {
                        model: req.db.courses,
                    },
                ],
            });

            res.json({
                ok: true,
                message: "OK",
                data: {applicants,},
            });
        } catch (error) {
            next(error);
        }
    }


    static async ApplicantPostController (req, res, next) {
        try {
            permissionChecker(
                ["admin", "operator"],
                req.user_permissions,
                res.error
            );
            const course_id = req.params.course_id;
            const course = await req.db.courses.findOne({
                where: {course_id,},
            });

            if (!course) {
                throw new res.error(404, "Course is not found");
            }

            const data = await AddApplicantValidation(req.body, res.error);

            const applicant = await req.db.applicants.create({
                applicant_name: data.name,
                applicant_gender: data.gender,
                applicant_birth_date: data.birth_date,
                applicant_description: data.description,
                applicant_phone: data.phone,
                applicant_source: data.source,
                applicant_status: "waiting",
                course_id,
                user_id: req.session.user_id,
            });
            console.log(applicant);
        } catch (error) {
            next(error);
        }
    }
}