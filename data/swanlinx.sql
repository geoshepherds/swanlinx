CREATE TABLE swanB AS
SELECT 
    hex.id AS id,
	sum(points.fruit_veg) / hex.pntcnt,
	sum(points.drink_ind)  / hex.pntcnt,
	sum(points.sleep_time) / hex.pntcnt,
	sum(points.fit_ind) / hex.pntcnt,
	sum(points.health_ind) / hex.pntcnt,
	sum(points.bleep_m) / hex.pntcnt,
	sum(points.bleep_f) / hex.pntcnt,
	sum(points.bmi_m) / hex.pntcnt,
	sum(points.bmi_f) / hex.pntcnt,
	sum(points.grip_m) / hex.pntcnt,
	sum(points.grip_f) / hex.pntcnt
FROM swanB AS points
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.id, hex.pntcnt, hex.geom;
 