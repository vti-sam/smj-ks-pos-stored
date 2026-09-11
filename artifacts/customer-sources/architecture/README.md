# Danh mục nguồn kiến trúc khách hàng

Bản sao nguyên trạng từ SVN local theo yêu cầu gom tài liệu. Không sửa tên hoặc nội dung tài liệu khách hàng. SHA-256 của từng bản sao đã đối chiếu với nguồn trong `manifest.json`. Chưa kiểm tra SVN remote HEAD hoặc trạng thái Backlog trực tuyến.

## Nguồn có căn cứ quyết định

- `【別紙】決定事項一覧_20260616.xlsx`: xem từng dòng, ngày và cột đối ứng. No.43 xác định tạo PDF binary trên OCI; không suy ra các dòng có chữ xem xét đã được quyết định chi tiết.
- `old/Ks様承認済み`: ba workbook về tham chiếu dữ liệu, in và nhật ký, cập nhật master. File chỉ dẫn trong thư mục ghi lưu các mục Backlog đã hoàn tất. Đây là bằng chứng từ checkout, chưa phải kiểm tra trạng thái trực tuyến.
- A4 và nhật ký có file chỉ dẫn sang workbook in chung tại JISEDAIKENTOU-62. Không thiếu hai workbook riêng.

## Cách dùng

Bản ngoài `old` được giữ để đối chiếu, không tự coi là bản phê duyệt mới nhất. Có chênh lệch thời hạn lưu nhật ký giữa hai workbook in: 7 năm và lưu lâu dài. Các file lịch sử được giữ để giải thích khác biệt, không dùng thay quyết định mới hơn mà thiếu căn cứ.

| Tài liệu | Trạng thái nguồn |
| --- | --- |
| [01.タブレットPOS_タブレットPOS⇔現行POSデータ連携.pptx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/01.タブレットPOS_タブレットPOS⇔現行POSデータ連携.pptx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [08.タブレットPOS_アーキテクチャ_在庫更新.pptx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/08.タブレットPOS_アーキテクチャ_在庫更新.pptx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [12.タブレットPOS_アーキテクチャ_本部データ連携.pptx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/12.タブレットPOS_アーキテクチャ_本部データ連携.pptx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [16.タブレットPOS_アーキテクチャ_POPクライアント.pptx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/16.タブレットPOS_アーキテクチャ_POPクライアント.pptx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [要件定義書（システム全体）_参照系（頁未定）.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/old/Ks様承認済み/JISEDAIKENTOU-61 02.参照系/要件定義書（システム全体）_参照系（頁未定）.xlsx>) | Lưu trong thư mục Ks様承認済み |
| [要件定義書（システム全体）_７．５．９．印刷・帳票・EJD.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/old/Ks様承認済み/JISEDAIKENTOU-62 03.レシート出力方式設計/要件定義書（システム全体）_７．５．９．印刷・帳票・EJD.xlsx>) | Lưu trong thư mục Ks様承認済み |
| [※JISEDAIKENTOU-62 03.レシート出力方式設計に格納](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/old/Ks様承認済み/JISEDAIKENTOU-63 04.A4帳票出力方式設計/※JISEDAIKENTOU-62 03.レシート出力方式設計に格納>) | Lưu trong thư mục Ks様承認済み |
| [※JISEDAIKENTOU-62 03.レシート出力方式設計に格納](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/old/Ks様承認済み/JISEDAIKENTOU-64 05.電子ジャーナル方式設計/※JISEDAIKENTOU-62 03.レシート出力方式設計に格納>) | Lưu trong thư mục Ks様承認済み |
| [要件定義書（システム全体）_マスター更新（夜間・定時・緊急）（頁未設定）.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/old/Ks様承認済み/JISEDAIKENTOU-68 09.マスタSV/要件定義書（システム全体）_マスター更新（夜間・定時・緊急）（頁未設定）.xlsx>) | Lưu trong thư mục Ks様承認済み |
| [※Backlogが完了になっている分を格納](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/old/Ks様承認済み/※Backlogが完了になっている分を格納>) | Lưu trong thư mục Ks様承認済み |
| [打合せ資料_処理概要図（FAX送信）.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/打合せ資料_処理概要図（FAX送信）.xlsx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [打合せ資料_処理概要図（オフラインデータ連携（マスターダウンロード含む））.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/打合せ資料_処理概要図（オフラインデータ連携（マスターダウンロード含む））.xlsx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [打合せ資料_処理概要図（サイン・写真画像連携（配送業務端末））.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/打合せ資料_処理概要図（サイン・写真画像連携（配送業務端末））.xlsx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [打合せ資料_処理概要図（マスター更新（夜間・定時・緊急））.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/打合せ資料_処理概要図（マスター更新（夜間・定時・緊急））.xlsx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [打合せ資料_処理概要図（レシート・Ａ４帳票・電子ジャーナル出力）.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/打合せ資料_処理概要図（レシート・Ａ４帳票・電子ジャーナル出力）.xlsx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [打合せ資料_処理概要図（修理PC連携）.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/打合せ資料_処理概要図（修理PC連携）.xlsx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [打合せ資料_処理概要図（参照系）.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/打合せ資料_処理概要図（参照系）.xlsx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [打合せ資料_処理概要図（売上実績・配送残）.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/打合せ資料_処理概要図（売上実績・配送残）.xlsx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [打合せ資料_処理概要図（排他処理）.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/打合せ資料_処理概要図（排他処理）.xlsx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [打合せ資料_処理概要図（直接更新）.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/打合せ資料_処理概要図（直接更新）.xlsx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [打合せ資料_処理概要図（端末入力データ保存、リカバリデータ保存）.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/打合せ資料_処理概要図（端末入力データ保存、リカバリデータ保存）.xlsx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [打合せ資料_処理概要図（練習モード）.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/打合せ資料_処理概要図（練習モード）.xlsx>) | Bản ngoài old; chưa xác nhận phê duyệt |
| [04.タブレットPOS_アーキテクチャ_A4帳票出力方式設計.pptx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/old/04.タブレットPOS_アーキテクチャ_A4帳票出力方式設計.pptx>) | Bản lịch sử để đối chiếu |
| [readme.txt](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/old/readme.txt>) | Bản lịch sử để đối chiếu |
| [アーキテクチャ方式決定項目リスト_20260602.xlsx](<svn/1000_要件定義書/1000_システム全体/アーキテクチャ概要/old/アーキテクチャ方式決定項目リスト_20260602.xlsx>) | Bản lịch sử để đối chiếu |
| [グランドデザイン_Ver3.0.5.pptx](<svn/4200_グランドデザイン/グランドデザイン_Ver3.0.5.pptx>) | Grand Design tham chiếu; không suy ra mọi nội dung đã chốt |
| [【別紙】決定事項一覧_20260616.xlsx](<svn/4200_グランドデザイン/【別紙】決定事項一覧_20260616.xlsx>) | Quyết định theo từng dòng và ngày; có cả nội dung tiếp tục xem xét |
| [ドキュメント一覧_Ver0.1.21.xlsx](<svn/0400_ドキュメント一覧/ドキュメント一覧_Ver0.1.21.xlsx>) | Danh mục tài liệu |
| [共通部品一覧_端末アプリ_Ver0.0.11.xlsm](<svn/0500_共通部品開発/2000_端末側/10_共通部品一覧/共通部品一覧_端末アプリ_Ver0.0.11.xlsm>) | Phân công thành phần; không phải bằng chứng đã triển khai |
