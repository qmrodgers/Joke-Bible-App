CREATE DATABASE celebrity_database;
USE celebrity_database;

DROP TABLE IF EXISTS celebrities;
CREATE TABLE celebrities (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(50) NOT NULL,
img_src VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO celebrities (name, img_src) VALUES ("Greta Thunberg", "gretathunberg");
INSERT INTO celebrities (name, img_src) VALUES ("Barack Obama", "barackobama");
INSERT INTO celebrities (name, img_src) VALUES ("Tom Cruise", "tomcruise");
INSERT INTO celebrities (name, img_src) VALUES ("Johnny Depp", "johnnydepp");
INSERT INTO celebrities (name, img_src) VALUES ("Tom Hanks", "tomhanks");
INSERT INTO celebrities (name, img_src) VALUES ("Britney Spears", "britneyspears");
INSERT INTO celebrities (name, img_src) VALUES ("George Clooney", "georgeclooney");
INSERT INTO celebrities (name, img_src) VALUES ("Ellen DeGeneres", "ellendegeneres");
INSERT INTO celebrities (name, img_src) VALUES ("Kim Kardashian", "kimkardashian");
INSERT INTO celebrities (name, img_src) VALUES ("Donald Trump", "donaldtrump");
INSERT INTO celebrities (name, img_src) VALUES ("Queen Elizabeth II", "queenelizabethii");
INSERT INTO celebrities (name, img_src) VALUES ("Eddie Murphy", "eddiemurphy");
INSERT INTO celebrities (name, img_src) VALUES ("George W. Bush", "georgewbush");
INSERT INTO celebrities (name, img_src) VALUES ("Madonna", "madonna");
INSERT INTO celebrities (name, img_src) VALUES ("Morgan Freeman", "morganfreeman");
INSERT INTO celebrities (name, img_src) VALUES ("Lady Gaga", "ladygaga");
INSERT INTO celebrities (name, img_src) VALUES ("Sandra Bullock", "sandrabullock");
INSERT INTO celebrities (name, img_src) VALUES ("Jennifer Lopez", "jenniferlopez");
INSERT INTO celebrities (name, img_src) VALUES ("Hillary Clinton", "hillaryclinton");
INSERT INTO celebrities (name, img_src) VALUES ("Elton John", "eltonjohn");
INSERT INTO celebrities (name, img_src) VALUES ("Joe Biden", "joebiden");
INSERT INTO celebrities (name, img_src) VALUES ("Michelle Obama", "michelleobama");
INSERT INTO celebrities (name, img_src) VALUES ("Snoop Dogg", "snoopdogg");
INSERT INTO celebrities (name, img_src) VALUES ("Oprah Winfrey", "oprahwinfrey");
INSERT INTO celebrities (name, img_src) VALUES ("Taylor Swift", "taylorswift");
INSERT INTO celebrities (name, img_src) VALUES ("Will Ferrell", "willferrell");
INSERT INTO celebrities (name, img_src) VALUES ("Angelina Jolie", "angelinajolie");
INSERT INTO celebrities (name, img_src) VALUES ("Bruce Willis", "brucewillis");
INSERT INTO celebrities (name, img_src) VALUES ("Jim Carrey", "jimcarrey");
INSERT INTO celebrities (name, img_src) VALUES ("Kanye West", "kanyewest");
INSERT INTO celebrities (name, img_src) VALUES ("Will Smith", "willsmith");
INSERT INTO celebrities (name, img_src) VALUES ("Leonardo DiCaprio", "leonardodicaprio");
INSERT INTO celebrities (name, img_src) VALUES ("Bill Cosby", "billcosby");
INSERT INTO celebrities (name, img_src) VALUES ("Jamie Lee Curtis", "jamieleecurtis");
INSERT INTO celebrities (name, img_src) VALUES ("Arnold Schwarzenegger", "arnoldschwarzenegger");
INSERT INTO celebrities (name, img_src) VALUES ("Mel Gibson", "melgibson");
INSERT INTO celebrities (name, img_src) VALUES ("Justin Bieber", "justinbieber");
INSERT INTO celebrities (name, img_src) VALUES ("Mariah Carey", "mariahcarey");
INSERT INTO celebrities (name, img_src) VALUES ("Betty White", "bettywhite");
INSERT INTO celebrities (name, img_src) VALUES ("Kamala Harris", "kamalaharris");
INSERT INTO celebrities (name, img_src) VALUES ("Bill Gates", "billgates");
INSERT INTO celebrities (name, img_src) VALUES ("Danny DeVito", "dannydevito");
INSERT INTO celebrities (name, img_src) VALUES ("Jay Leno", "jayleno");
INSERT INTO celebrities (name, img_src) VALUES ("Stevie Wonder", "steviewonder");
INSERT INTO celebrities (name, img_src) VALUES ("Michael J. Fox", "michaeljfox");
INSERT INTO celebrities (name, img_src) VALUES ("Jimmy Fallon", "jimmyfallon");
INSERT INTO celebrities (name, img_src) VALUES ("Brad Pitt", "bradpitt");
INSERT INTO celebrities (name, img_src) VALUES ("Clint Eastwood", "clinteastwood");
INSERT INTO celebrities (name, img_src) VALUES ("Denzel Washington", "denzelwashington");
INSERT INTO celebrities (name, img_src) VALUES ("George Lopez", "georgelopez");
INSERT INTO celebrities (name, img_src) VALUES ("Bill Clinton", "billclinton");
INSERT INTO celebrities (name, img_src) VALUES ("Whoopi Goldberg", "whoopigoldberg");
INSERT INTO celebrities (name, img_src) VALUES ("Jerry Springer", "jerryspringer");
INSERT INTO celebrities (name, img_src) VALUES ("Donald Trump, Jr.", "donaldtrumpjr");
INSERT INTO celebrities (name, img_src) VALUES ("Chuck Norris", "chucknorris");
INSERT INTO celebrities (name, img_src) VALUES ("Sylvester Stallone", "sylvesterstallone");
INSERT INTO celebrities (name, img_src) VALUES ("Cameron Diaz", "camerondiaz");
INSERT INTO celebrities (name, img_src) VALUES ("Jerry Seinfeld", "jerryseinfeld");
INSERT INTO celebrities (name, img_src) VALUES ("Matt Damon", "mattdamon");
INSERT INTO celebrities (name, img_src) VALUES ("Dwayne Johnson", "dwaynejohnson");
INSERT INTO celebrities (name, img_src) VALUES ("Keanu Reeves", "keanureeves");
INSERT INTO celebrities (name, img_src) VALUES ("Ivanka Trump", "ivankatrump");
INSERT INTO celebrities (name, img_src) VALUES ("Ben Affleck", "benaffleck");
INSERT INTO celebrities (name, img_src) VALUES ("John Travolta", "johntravolta");
INSERT INTO celebrities (name, img_src) VALUES ("Nicolas Cage", "nicolascage");
INSERT INTO celebrities (name, img_src) VALUES ("Janet Jackson", "janetjackson");
INSERT INTO celebrities (name, img_src) VALUES ("Samuel L. Jackson", "samuelljackson");
INSERT INTO celebrities (name, img_src) VALUES ("Melania Trump", "melaniatrump");
INSERT INTO celebrities (name, img_src) VALUES ("Bernie Sanders", "berniesanders");
INSERT INTO celebrities (name, img_src) VALUES ("Cher", "cher");
INSERT INTO celebrities (name, img_src) VALUES ("Justin Timberlake", "justintimberlake");
INSERT INTO celebrities (name, img_src) VALUES ("Paul McCartney", "paulmccartney");
INSERT INTO celebrities (name, img_src) VALUES ("Christina Aguilera", "christinaaguilera");
INSERT INTO celebrities (name, img_src) VALUES ("Jackie Chan", "jackiechan");
INSERT INTO celebrities (name, img_src) VALUES ("Robert Downey Jr.", "robertdowneyjr");
INSERT INTO celebrities (name, img_src) VALUES ("Robert De Niro", "robertdeniro");
INSERT INTO celebrities (name, img_src) VALUES ("Rihanna", "rihanna");
INSERT INTO celebrities (name, img_src) VALUES ("Carrie Underwood", "carrieunderwood");
INSERT INTO celebrities (name, img_src) VALUES ("Miley Cyrus", "mileycyrus");
INSERT INTO celebrities (name, img_src) VALUES ("Dolly Parton", "dollyparton");
INSERT INTO celebrities (name, img_src) VALUES ("Matthew McConaughey", "matthewmcconaughey");


SELECT * FROM celebrities;