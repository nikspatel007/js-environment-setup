import './index.css';

import numeral from 'numeral';

const value = numeral(100).format('$0,0.00');
console.log(`It will only cost you ${value}. `);
