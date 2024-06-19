// form 요소를 선택
const form = document.querySelector('#form');
const copy = document.querySelector('.copy');

// form 제출 이벤트 처리
form.addEventListener('submit', (e) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막음
    const size = parseInt(form.input.value); // 입력된 값을 정수로 변환
    document.querySelector('.text-section').innerHTML = loremIpsum(size); // 생성된 텍스트를 text-section에 추가
});

// 텍스트 생성 함수
function loremIpsum(size) {
    // Lorem Ipsum 예제 텍스트
    const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula odio non risus finibus feugiat.
    Donec bibendum, sapien eget volutpat dapibus, urna velit malesuada tortor, et fermentum arcu
    velit non dui.
    Vestibulum condimentum, justo sed rhoncus laoreet, nunc tellus viverra nulla, nec eleifend purus velit non justo. Proin sit amet venenatis velit, eu varius nunc. Integer eget ligula eu metus elementum
    sodales.
    Sed efficitur, mi a rhoncus vehicula, odio orci malesuada elit, at fermentum justo nulla et
    urna.
    Cras auctor, elit at lacinia eleifend, metus ex condimentum purus, ut lacinia tortor lectus id ipsum.
    Nunc viverra sit amet justo in lacinia. Vestibulum scelerisque, orci id cursus placerat, purus purus bibendum urna, at scelerisque quam libero sed arcu.
    Fusce eget purus eget purus sodales tristique ac nec nunc. Pellentesque eleifend laoreet ultrices.`;
    const array = lorem.split('\n'); // 예제 텍스트를 줄 단위로 분리하여 배열로 변환
    let result = '';

    // size만큼 텍스트 생성
    for (let i = 0; i < size; i++) {
        result += `<p class="text-white font-semibold">${array[i % array.length]}</p>`; // 텍스트를 반복하여 추가
    }

    // 텍스트 컨테이너를 보여주거나 숨김
    if (result) {
        document.querySelector('.text-wrapper').style.display = 'flex'; // 텍스트가 있으면 보여줌
    } else {
        document.querySelector('.text-wrapper').style.display = 'none'; // 텍스트가 없으면 숨김
    }
    return result; // 생성된 텍스트 반환
}

// copy 버튼에 이벤트 추가
copy.addEventListener('click', (e) => {
    const text = document.querySelector('.text-section').textContent; // text-section의 텍스트를 가져옴
    const textArea = document.createElement('textarea'); // 임시 텍스트 영역 생성
    textArea.value = text; // 텍스트 영역에 텍스트 설정
    document.body.appendChild(textArea); // 텍스트 영역을 문서에 추가
    textArea.style.display = 'none'; // 텍스트 영역을 보이지 않게 설정
    textArea.select(); // 텍스트 영역의 텍스트 선택
    textArea.setSelectionRange(0, 99999); // 텍스트 영역의 전체 텍스트 선택
    if (textArea.select) {
        navigator.clipboard.writeText(textArea.value); // 클립보드에 텍스트 복사
        copy.classList.add('fa-clipboard'); // 복사 완료 아이콘으로 변경
        copy.classList.remove('fa-copy'); // 원래 아이콘 제거
        setTimeout(() => {
            copy.classList.remove('fa-clipboard'); // 잠시 후 아이콘 원래대로 복원
            copy.classList.add('fa-copy');
        }, 500);
    }
    document.body.removeChild(textArea); // 임시 텍스트 영역 제거
});
