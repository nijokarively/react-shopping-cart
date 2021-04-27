const logger = require('../logger');

const createModel = (name, data) => {
    const model = {
        findById: id =>
            Promise.resolve(data.find(item => item.id === String(id))),

        count: () => Promise.resolve(data.length),

        fetch: ({ skip = 0, limit = 10 } = {}) => Promise.resolve(data.slice(skip, skip + limit)),

        add: async doc => {
            if (!doc) throw new Error(`[${name}] Empty document`);
            if (!doc.id) throw new Error(`[${name}] No document id`);
            if (typeof doc.id !== 'string') throw new Error(`Document id not a string`);
            if (await model.findById(doc.id)) throw new Error(`Document with id=${doc.id} already exists`);

            data.push(doc);

            return doc;
        },
    };

    for (const [method, cb] of Object.entries(model)) {
        model[method] = (...args) => {
            logger.log('%s.%s(', name, method, ...args, ')');
            return cb(...args);
        }
    }

    return model;
}

module.exports = {
    Product: createModel('Product', require('./products.json')),
    List: createModel('List', require('./lists.json')),
    Image: createModel('Image', require('./images.json')),
};
