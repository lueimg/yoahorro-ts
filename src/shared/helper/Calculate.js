import IsNumber from './IsNumber';
import OperationTypes from './OperationTypes';
import operate from './Operation';
class Calculate {
  runCalculation(obj, input) {
    if (input === OperationTypes.ac) {
      return this.resetCalculation()
    }
    if (IsNumber(input)) {
      if (input == "0" && obj.next == "0") {
        return {};
      }
      // If there is an operation, update next
      if (obj.operation) {
        if (obj.next) {
          return { next: obj.next + input.toString() };
        }
        return { next: input };
      }
      // If there is no operation, update next and clear the value
      if (obj.next) {
        return {
          next: obj.next + input.toString(),
          total: null,
        };
      }
      return {
        next: input,
        total: null,
      };
    }

    if (input === OperationTypes.point) {
      if (obj.next) {
        // ignore a . if the next number already has one
        if (obj.next.toString().includes(".")) {
          return {};
        }
        return { next: obj.next + "." };
      }
      return { next: "0." };
    }

    if (input === OperationTypes.equal) {
      return this.calclulateResult(obj)
    }

    // Button must be an operation

    // When the user presses an operation button without having entered
    // a number first, do nothing.
    // if (!obj.next && !obj.total) {
    //   return {};
    // }

    if (obj.operation) {
      return {
        total: operate.run(obj.total, obj.next, obj.operation),
        next: null,
        operation: input,
      };
    }

    if (!obj.next) {
      return { operation: input };
    }

    return {
      total: obj.next,
      next: null,
      operation: input,
    };

  }

  resetCalculation() {
    return {
      total: null,
      next: null,
      operation: null,

    }
  }

  calclulateResult(obj) {
    return obj.next && obj.operation ?
      {
        total: operate.run(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
      } :
      {};
  }

}
const instance = new Calculate();

export default instance;