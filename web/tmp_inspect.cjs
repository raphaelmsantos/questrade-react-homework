const p = require('@typescript-eslint/eslint-plugin');
console.log('configs keys:', Object.keys(p.configs));
console.log('has recommended:', !!p.configs.recommended);
console.log('has flat:', !!p.configs.flat);
console.log('configs sample keys:', Object.keys(p.configs).slice(0,10));
