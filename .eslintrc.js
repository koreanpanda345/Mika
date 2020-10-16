module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 12
	},
	"rules": {
		"brace-style": ["error", "allman"],
		"indent": ["error", "4"],
		"quotes": ["error", "double"],
		"semi": ["error", "always"]
	}
};
