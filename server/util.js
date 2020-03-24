var find = async function(data) {
    let res = []
    await data.model.find(data.data, (err, doc) => {
        res = err ? [] : doc
    })
    return res
}
var save = async function(data) {
    await data.model.save()
}
module.exports = {
    find,
    save
};