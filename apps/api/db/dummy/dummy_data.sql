INSERT INTO users (email, passwordHash)
VALUES
  ('alice@example.com', '$2a$10$abcdefghijklmnopqrstuv'),
  ('bob@example.com',   '$2a$10$uvwxyz0123456789ABCDE'), 
  ('charlie@example.com', '$2a$10$ABCD1234EFGH5678IJKL'),
  ('david@example.com', '$2a$10$MNOPQRSTUVWX01234567');

-- =============================
-- 1) cattle テーブルのダミーデータ
-- =============================
INSERT INTO cattle (
  ownerUserId,
  identificationNumber,
  earTagNumber,
  name,
  growthStage,
  birthday,
  age,
  monthsOld,
  daysOld,
  gender,
  score,
  breed,
  healthStatus,
  producerName,
  barn,
  breedingValue,
  notes
)
VALUES
-- cattleId=1 (自動採番)
(1, 1001, '1234', 'たろう',   'CALF',   '2023-01-01', 1,   12,  30,  'メス',   70, '黒毛和種', '妊娠中',      '生産者A', '牛舎A', 'AAAAAA', '健康状態良好'),
-- cattleId=2
(1, 1002, '5678', 'ハナコ', 'ADULT',   '2020-06-10', 3,   36,  100, 'オス', 85, '黒毛和種', '健康',      '生産者A', '牛舎A', 'BABCBB', '非常におとなしい性格で、健康良好'),
-- cattleId=3
(2, 2001, '9012', 'じろう',   'FATTENING', '2022-07-20', 1,   14,  45,  'オス',   78, '黒毛和種',   '健康', '生産者B', '牛舎B', 'BABCBB', '成長が早く、今後の期待大'),
-- cattleId=4
(2, 2002, '3456', 'マルコ', 'GROWING', '2021-05-15', 2,   24,  70,  'メス', 90, '黒毛和種',   '休息中',      '生産者B', '牛舎B', 'AAAAAA', '生産後の休息中。元気な状態を維持');



-- =============================
-- 2) bloodline テーブルのダミーデータ
-- =============================
INSERT INTO bloodline (
  cattleId,
  fatherCattleName,
  motherFatherCattleName,
  motherGrandFatherCattleName,
  motherGreatGrandFatherCattleName
)
VALUES
-- 例: cattleId=1 (Taro) の血統
(1, '茂忠', '幸茂', '茂晴花', '福忠'),
-- 例: cattleId=2 (Hanako) の血統
(2, '安福久', '藤忠', '勝忠平', '茂晴花'),
-- 例: cattleId=3 (Jiro) の血統
(3, '茂福', '福忠', '安茂勝', '藤茂'),
-- 例: cattleId=4 (Maruko) の血統
(4, '茂晴花', '福茂', '忠富士', '安茂勝');



-- =============================
-- 3) mother_info テーブルのダミーデータ
-- =============================
INSERT INTO mother_info (
  cattleId,
  motherCattleId,
  motherName,
  motherIdentificationNumber,
  motherScore
)
VALUES
-- 例: cattleId=1(Taro) の母情報 (母をHanako(cattleId=2)と想定)
(1, 2, 'ハナコ', '1002', 85),
-- 例: cattleId=2(Hanako) の母情報 (母をMaruko(cattleId=4)と想定)
(2, 4, 'マルコ', '2002', 90),
-- 例: cattleId=3(Jiro) の母情報 (仮に母がHanako=2)
(3, 2, 'ハナコ', '1002', 85),
-- 例: cattleId=4(Maruko) の母情報 (母をHanako=2, ただし実際は任意)
(4, 2, 'ハナコ', '1002', 85);
