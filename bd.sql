CREATE DATABASE movieReviews;
USE movieReviews;

DROP TABLE IF EXISTS review;
CREATE TABLE review(
	user VARCHAR(200) NOT NULL,
    movie VARCHAR(200) NOT NULL,
    rating INT NOT NULL CHECK(rating >= 0 AND rating <= 5)
    );
    
   select * from review;
   
