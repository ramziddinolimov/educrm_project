const { CourseCreateValidation } = require('../modules/validations');
const permissionChecker = require('../helpers/permissionChecker');
const path = require('path');
const fs = require('fs');

module.exports = class CourseController {
    static async CourseCreatePostController(req, res, next) {
        try {
            permissionChecker("admin", req.user_permissions, res.error);

            const photo = req?.files?.photo;

            if(photo && photo?.size > 5 * 1024 * 1024) {
                throw new res.error(
                    400,
                    "Size of photo must be less than 5 MB"
                );
            }

            const data = await CourseCreateValidation(req.body, res.error);

            let photo_name = photo
                ? photo.md5 +
                "." + 
                photo.mimeType.split('/')[
                    photo.mimeType.split("/").length - 1
                ] 
                : null;

                if(photo){
                    photo.mv(
                        path.join(__dirname, "..", "public", "uploads", "photo_name")
                    );
                }
        } catch (error) {
            
        }
    }
}