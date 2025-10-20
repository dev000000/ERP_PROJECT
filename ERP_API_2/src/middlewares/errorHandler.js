function errorHandler(err, req, res, next) {
	console.error('❌ Error:', err)
	res.status(500).json({ message: 'Lỗi hệ thống', error: err.message })
}

module.exports = { errorHandler }
