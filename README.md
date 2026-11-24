# Лаборатори №1: Playwright UI автомат тест

**Оюутны нэр:** Батболд Анар  
**Хичээл:** F.CSA313 — Программ хангамжийн чанарын баталгаа ба тест

## Хийсэн ажлын товч

Энэ лабораторид SauceDemo (`https://www.saucedemo.com`) сайт дээр Playwright төсөл тохируулж, Chromium хөтөч дээр 3 UI тест бичиж ажиллууллаа.

1. Амжилттай нэвтрэх ба logout хийх тест
2. Буруу нууц үгээр нэвтрэхэд алдааны мессеж шалгах сөрөг тест
3. Нэвтрээд барааг сагсанд нэмж, сагсны хуудсыг нээж барааг шалгах тест

Бүх тест `tests/mytest.spec.ts` файлд байна. Элементийн роль, текст, placeholder-оор `getByRole`, `getByText`, `getByPlaceholder` locator-уудыг ашигласан. XPath ашиглаагүй нь DOM бүтэц өөрчлөгдөхөд тест эвдрэх эрсдэлийг багасгаж, Playwright-ийн auto-wait болон хөтөчийн нэвчилсэн role/text-аар элементийг илүү тогтвортой олгоно.

Тест тус бүр шинэ browser context/page авдаг тул тестүүдийн хооронд shared session буюу state үлддэггүй. Logout-ийг тусдаа helper болгосон бөгөөд амжилттай нэвтэрсэн хоёр тест (1 ба 3) түүгээр дуусдаг. Тест 2 нь нэвтэрдэггүй тул logout хийх шаардлагагүй.

```bash
npm install
npx playwright install chromium
npx playwright test --trace on
npx playwright show-report
```

## Тестийн үр дүн

Сүүлийн ажиллуулалтанд 3 тестийн 3 нь амжилттай (`3 passed`, `5.7s`) болсон. Тестийн HTML report нь `playwright-report/index.html`; бүртгэгдсэн trace, screenshot болон video evidence-уудыг `evidence/` хавтсанд хадгалсан.

## Playwright ба Selenium-ийн харьцуулалт

Selenium болон Playwright хоёр тус бүр Apache 2.0 лицензтэй, үнэгүй нээлттэй эхийн хэрэгсэл юм. Selenium-д элемент бэлэн болохыг гараар explicit wait-ээр хүлээх, хөтөч бүрт тусдаа driver суулгах шаардлагатай байдаг. Харин Playwright-ийн auto-wait элемент бэлэн болтол автоматаар хүлээж, кодыг богино бөгөөд найдвартай болгодог, мөн хөтчүүдийг нэг командаар суулгадаг. Playwright-ийн Codegen нь үйлдлээ бичүүлээд тестийн код болгож өгдөг давуу талтай. Trace viewer нь алхам бүрийн DOM snapshot, screenshot, network-ийг харуулж, Selenium-ийн лог, скриншоттой харьцуулахад алдаа мөшгихэд илүү тустай байсан. Selenium нь Java, .NET орчинд удаан хугацааны mature ecosystem-тэй боловч энэ ажилд JavaScript/TypeScript-д Playwright илүү хурдан, хөнгөн сонголт байсан.

## Эхний алдаа ба засвар

Эхний ажиллуулалтад logout-ийн `link` locator болон cart count-ийн test id таарахгүй байсан. Текст, role болон card scoping-ээр эдгээр locator-уудыг засварласан. `evidence/failed-run/` фолдерт Алхам 4-т санаатайгаар assertion-ыг буруу болгож унагаасан тестийн trace, screenshot, video хадгалсан.

## Хавсаргасан evidence

- `evidence/passing/` — амжилттай тестүүдийн trace, video
- `evidence/failed-run/` — assertion болон locator алдааны screenshot/trace/video
- `playwright-report/index.html` — HTML report
