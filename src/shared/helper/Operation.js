import Big from "big.js";
import OperationTypes from './OperationTypes';
class Operation {
  run(a, b, operation) {
    const one = Big(a || "0");
    const two = Big(b || "0");
    if (operation === OperationTypes.sum) {
      return one.plus(two).toString();
    }
    if (operation === OperationTypes.rest) {
      return one.minus(two).toString();
    }
    if (operation === OperationTypes.multiplication) {
      return one.times(two).toString();
    }
    if (operation === OperationTypes.division) {
      return one.div(two).toString();
    }
    throw Error(`Unknown operation '${operation}'`);
  }
}
const instance = new Operation();

export default instance;