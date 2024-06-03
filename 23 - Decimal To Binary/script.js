function convert() {
    let to_convert = document.getElementById("to_convert").value; // 변수 할당에 등호(=)가 아니라 할당 연산자(=)를 사용해야 합니다.
    to_convert = parseFloat(to_convert);

    // Function to convert decimal to binary
    function decimalToBinary(number) {
        if (number === 0) { // 비교 연산자를 사용하여 값을 비교해야 합니다.
            return "0";
        }
        let binary = "";
        while (number > 0) {
            binary = (number % 2).toString() + binary; // 할당 연산자(=)를 사용하여 값을 할당해야 합니다.
            number = Math.floor(number / 2); // 할당 연산자(=)를 사용하여 값을 할당해야 합니다.
        }
        return binary;
    }

    // Convert the number to binary
    let binaryResult = decimalToBinary(to_convert); // 변수 이름을 수정했습니다.

    // Visualizing results
    let final = document.getElementById("res"); // 변수 이름을 수정했습니다.
    final.value = binaryResult; // 할당 연산자(=)를 사용하여 값을 할당해야 합니다.
}
