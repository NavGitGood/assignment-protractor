function deleteFromObject(obj, keys) {
    for (key of keys) delete obj[key]
    return obj;
}

module.exports = {
    deleteFromObject
}