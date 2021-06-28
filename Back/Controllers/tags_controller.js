const { tagsRepository } = require('../Repositories');

async function getTagsForChartByUserId(req, res, next) {
    try {
        const { id_user } = req.params;
        const tags = await tagsRepository.findTagsForChartByUserId(id_user);
        res.send({ tags });
    } catch (err) {
        next(err);
    }
}

async function getTagByIncidence(req, res, next) {
    try {
        const tags = await tagsRepository.findTagsByIncidence();
        res.send({
            tags,
        });
    } catch (err) {
        next(err);
    }
}
module.exports = {
    getTagsForChartByUserId,
    getTagByIncidence,
};
