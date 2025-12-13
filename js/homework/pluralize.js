function pluralizeRecords(n) {

    const lastDigit = n % 10;
    const lastTwoDigits = n % 100;

    let form;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        form = "записей";
    } else if (lastDigit === 1) {
        form = "запись";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        form = "записи";
    } else {
        form = "записей";
    }

    return `В результате выполнения запроса было найдено ${n} ${form}`;
}