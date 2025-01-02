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
(1, 1001, 'E-101', 'Taro',   '仔牛',   '2023-01-01', 1,   12,  30,  'Male',   70, 'Holstein', 'Good',      'Producer A', 'Barn A', 'BV-1001', 'Healthy male calf'),
-- cattleId=2
(1, 1002, 'E-102', 'Hanako', '成牛',   '2020-06-10', 3,   36,  100, 'Female', 85, 'Holstein', 'Fair',      'Producer A', 'Barn A', 'BV-1002', 'Has calved once'),
-- cattleId=3
(2, 2001, 'E-201', 'Jiro',   '肥育牛', '2022-07-20', 1,   14,  45,  'Male',   78, 'Jersey',   'Excellent', 'Producer B', 'Barn B', 'BV-2001', 'High growth potential'),
-- cattleId=4
(2, 2002, 'E-202', 'Maruko', '育成牛', '2021-05-15', 2,   24,  70,  'Female', 90, 'Jersey',   'Good',      'Producer B', 'Barn B', 'BV-2002', 'Showing good progress');



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
(1, 'Father-X', 'HanaFather-X', 'HanaGrand-X', 'HanaGreatGrand-X'),
-- 例: cattleId=2 (Hanako) の血統
(2, 'Father', 'SpecialFather', 'SpecialGrandFather', 'SpecialGreatGrandFather'),
-- 例: cattleId=3 (Jiro) の血統
(3, 'Father-X', 'UnknownMotherFather', 'UnknownMotherGrandFather', 'UnknownMotherGreatGrandFather'),
-- 例: cattleId=4 (Maruko) の血統
(4, 'Father-X', 'None', 'None', 'None');



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
(1, 2, 'Hanako', '1002', 85),
-- 例: cattleId=2(Hanako) の母情報 (母をMaruko(cattleId=4)と想定)
(2, 4, 'Maruko', '2002', 90),
-- 例: cattleId=3(Jiro) の母情報 (仮に母がHanako=2)
(3, 2, 'Hanako', '1002', 85),
-- 例: cattleId=4(Maruko) の母情報 (母をHanako=2, ただし実際は任意)
(4, 2, 'Hanako', '1002', 85);
