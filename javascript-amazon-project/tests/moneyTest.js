import { formatCurrency } from "../scripts/utils/money.js";

function tell(value) {
    console.log(value);
}

tell('test suite: Format Currency');

tell('change cents to dollar');
if (formatCurrency(2095) === '20.95') {
    tell('passed');
} else {
    tell('failed');
}

tell('works with zero');
if (formatCurrency(0) === '0.00') {
    tell('passed');
} else {
    tell('failed');
}

tell('rounds up to a nearest cent');
if (formatCurrency(2000.5) === '20.01') {
    tell('passed');
} else {
    tell('failed');
}

if (formatCurrency(2000.4) === '20.00') {
    tell('passed');
} else {
    tell('failed');
}
