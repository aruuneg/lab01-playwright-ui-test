# Лаборатори №1: Playwright UI автомат тест

**Оюутны нэр:** Батболд Анар  
**Хичээл:** F.CSA313 — Программ хангамжийн чанарын баталгаа ба тест

## Хийсэн ажлын товч

Энэ лабораторид SauceDemo (`https://www.saucedemo.com`) сайт дээр Playwright төсөл тохируулж, Chromium хөтөч дээр 3 UI тест бичиж ажиллууллаа.

1. Амжилттай нэвтрэх ба logout хийх тест
2. Буруу нууц үгээр нэвтрэхэд алдааны мессеж шалгах сөрөг тест
3. Нэвтрээд барааг сагсанд нэмж, сагсны хуудсыг нээж барааг шалгах тест

Бүх тест `tests/mytest.spec.ts` файлд байна. Элементийн роль, текст, placeholder болон test id-ын үндсэн `getByRole`, `getByText`, `getByPlaceholder`, `getByTestId` locator-уудыг ашигласан. XPath ашиглаагүй нь DOM бүтэц өөрчлөгдөхөд тест эвдрэх эрсдэлийг багасгаж, Playwright-ийн auto-wait болон хөтөчийн нэвчилсэн role/text-аар элементийг илүү тогтвортой олгоно.

Тест тус бүр шинэ browser context/page авдаг тул shared session or state үлдээгүй. Logout үйлдэл нь хоёр амжилттай тестийн төгсгөлийг цэвэрхэн дуусгах helper болгохдоо login helper-ээс тусад нь заасан.

```bash
npm install
npx playwright install chromium
npx playwright test --trace on
npx playwright show-report
```

## Тестийн үр дүн

Сүүлийн ажиллуулалтанд 3 тестийн 3 нь амжилттай (`3 passed`, `6.0s`) болсон. Тестийн HTML report нь `playwright-report/index.html`; бүртгэгдсэн trace, screenshot болон video evidence-уудыг `evidence/` хавтсанд хадгалсан.

## Playwright ба Selenium-ийн харьцуулалт

Selenium ба Playwright хоёр тус бүр Apache 2.0 license-тэй бөгөөд үнэгүй open-source хэрэгсэл юм. Selenium-д explicit wait болон driver суулгах шаардлага илүү тохиромжтой харин Playwright-ийн auto-wait нь элемент бэлэн болтол автоматаар хүлээж, кодыг богино бөгөөд найдвартай болгоно. Playwright-ийн browser болон driver суулгалт нэг Playwright package-аар удирдагдахад Selenium-ийн хөтөч бүрд тусдаа driver шаардлагатай байж болно. Playwright-ийн Codegen гарын ажиллагааг test код болгон бичиж өгөх давуу талтай. Trace viewer нь шаг бүрийн DOM snapshot, network, screenshot, time line-ыг харуулж, Selenium-ийн лог/скриншоттай харьцуулахад алдаа мөшгихэд илүү сайн байна. Selenium нь хэдийдэ Java, .NET орчинд mature ecosystemтэй боловч энэ ажилд JavaScript/TypeScript болон browser automation-д Playwright илүү хурдан, хөнгөлттэй сонголт болсон.

## Эхний алдаа ба засвар

Эхний ажиллуулалтад logout-ийн `link` locator болон cart count-ийн test id таарахгүй болсон. Текст, role болон card scoping-ийг ашиглан эдгээр locator-уудыг засварласан. Эхний алдааны trace болон screenshot-ийг evidence/failed-run фолдерт үлдээсэн.

## Хавсаргасан evidence

- `evidence/passing/` — амжилттай тестүүдийн trace, video
- `evidence/failed-run/` — assertion болон locator алдааны screenshot/trace/video
- `playwright-report/index.html` — HTML report
