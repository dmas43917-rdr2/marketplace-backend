exports.success = (res, message = 'succes', data = null) => {
    return res.status(200).json({
        status: 'success',
        message,
        data,
    });
};

exports.error = (res, message = 'error', code = 500) => {
    return res.status(code).json({
        status: 'error',
        message,
    });
};