CREATE TABLE bmi_m_count AS
SELECT 
	count(points.bmi_m) AS count,
	hex.gid AS gid,
	hex.geom AS geom
FROM points 
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.geom, hex.gid;

CREATE TABLE bmi_f_count AS
SELECT 
	count(points.bmi_f) AS count,
	hex.gid AS gid,
	hex.geom AS geom
FROM points 
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.geom, hex.gid;

CREATE TABLE grip_m_count AS
SELECT 
	count(points.grip_m) AS count,
	hex.gid AS gid,
	hex.geom AS geom
FROM points 
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.geom, hex.gid;

CREATE TABLE grip_f_count AS
SELECT 
	count(points.grip_f) AS count,
	hex.gid AS gid,
	hex.geom AS geom
FROM points 
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.geom, hex.gid;

CREATE TABLE bleep_m_count AS
SELECT 
	count(points.bleep_m) AS count,
	hex.gid AS gid,
	hex.geom AS geom
FROM points 
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.geom, hex.gid;

CREATE TABLE bleep_f_count AS
SELECT 
	count(points.bleep_f) AS count,
	hex.gid AS gid,
	hex.geom AS geom
FROM points 
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.geom, hex.gid;

CREATE TABLE fit_ind_count AS
SELECT 
	count(points.fit_ind) AS count,
	hex.gid AS gid,
	hex.geom AS geom
FROM points 
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.geom, hex.gid;

CREATE TABLE health_ind_count AS
SELECT 
	count(points.health_ind) AS count,
	hex.gid AS gid,
	hex.geom AS geom
FROM points 
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.geom, hex.gid;

CREATE TABLE sleep_time_count AS
SELECT 
	count(points.sleep_time) AS count,
	hex.gid AS gid,
	hex.geom AS geom
FROM points 
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.geom, hex.gid;

CREATE TABLE drink_ind_count AS
SELECT 
	count(points.drink_ind) AS count,
	hex.gid AS gid,
	hex.geom AS geom
FROM points 
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.geom, hex.gid;

CREATE TABLE fruit_veg_count AS
SELECT 
	count(points.fruit_veg) AS count,
	hex.gid AS gid,
	hex.geom AS geom
FROM points 
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.geom, hex.gid;


















