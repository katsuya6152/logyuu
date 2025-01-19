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
(1, 1001, 1234, 'たろう',   'CALF',   '2023-01-01', 1,   12,  30,  'オス',   70, '黒毛和種', '妊娠中',      '生産者A', '牛舎A', 'AAAAAA', '健康状態良好'),
-- cattleId=2
(1, 1002, 5678, 'ハナコ', 'ADULT',   '2020-06-10', 3,   36,  100, 'メス', 85, '黒毛和種', '健康',      '生産者A', '牛舎A', 'BABCBB', '非常におとなしい性格で、健康良好'),
-- cattleId=3
(2, 2001, 9012, 'じろう',   'FATTENING', '2022-07-20', 1,   14,  45,  'メス',   78, '黒毛和種',   '治療中', '生産者B', '牛舎B', 'BABCBB', '成長が早く、今後の期待大'),
-- cattleId=4
(2, 2002, 3456, 'マルコ', 'GROWING', '2021-05-15', 2,   24,  70,  'オス', 90, '黒毛和種',   '休息中',      '生産者B', '牛舎B', 'AAAAAA', '生産後の休息中。元気な状態を維持');



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

-- =============================
-- 4) breeding_status テーブルのダミーデータ
-- =============================
INSERT INTO breeding_status (
  cattleId,
  parity,
  expectedCalvingDate,
  scheduledPregnancyCheckDate,
  daysAfterCalving,
  daysOpen,
  pregnancyDays,
  daysAfterInsemination,
  inseminationCount,
  breedingMemo,
  isDifficultBirth
)
VALUES
-- cattleId=1 (たろう)
(1, 1, '2023-12-01', '2023-10-15', 30, 20, 50, 10, 2, '初産で順調', 0),
-- cattleId=2 (ハナコ)
(2, 2, '2024-01-15', '2023-11-30', 25, 15, 40, 5, 1, '順調に成長中', 0),
-- cattleId=3 (じろう)
(3, 1, '2023-11-20', '2023-10-05', 10, 5, 70, 20, 1, '妊娠期間長め', 1),
-- cattleId=4 (マルコ)
(4, 1, NULL, NULL, 0, 0, 0, 0, 0, 'まだ繁殖サイクルに入っていない', 0);


-- =============================
-- 5) breeding_summary テーブルのダミーデータ
-- =============================
INSERT INTO breeding_summary (
  cattleId,
  totalInseminationCount,
  averageDaysOpen,
  averagePregnancyPeriod,
  averageCalvingInterval,
  difficultBirthCount,
  pregnancyHeadCount,
  pregnancySuccessRate
)
VALUES
-- cattleId=1 (たろう)
(1, 2, 25, 280, 360, 0, 1, 90),
-- cattleId=2 (ハナコ)
(2, 3, 30, 290, 370, 1, 1, 95),
-- cattleId=3 (じろう)
(3, 1, 20, 270, 365, 0, 2, 80),
-- cattleId=4 (マルコ)
(4, 0,  0,  0,   0,   0, 0, 0);