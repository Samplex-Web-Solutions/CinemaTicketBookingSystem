// src/components/Home/Home.js
import React from "react";
import { Link } from "react-router-dom"; // For navigation
import { Clock4 } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import Footer from "../components/Footer/Footer";
import ft1 from '../img/ft1.jpg'
import ft2 from '../img/ft2.jpg'
import ft3 from '../img/ft3.jpg'
import ft4 from '../img/ft4.jpg'
import ft5 from '../img/ft5.jpg'


// import featuredimg from "../img/featuredimg.jpeg";
import "../pages/pages css/Home.css";
import { Button } from "../components/ui/button";

function Home() {
  return (
    <div>
      <div className="home-container home-controller">
      <section className="hero-section">
        <div className="hero-content">
          <p>Catch the Latest Movies Anytime</p>
          <p>
            Enjoy a seamless cinema booking experience with just a few clicks!
          </p>
          <Link to="/movies" className="btn btn-primary">
            <Button className="hero-btn">Browse Movies</Button>
          </Link>
        </div>
      </section>

      {/* //Featured section */}

      <section className="featured-container">
        <div className="featured-header">
          <h2>Featured Movies</h2>
        </div>
        <div className="featured-controller">
          <div className="featured-method">
            <div className="row-1">
              <img src={ft1} alt="Top level CIA agent"></img>
            </div>
            <div className="row-2">
              <h2>Canary Black</h2>
              <p>
                Top level CIA agent Avery Graves is blackmailed by terrorists
                into betraying her own country to save her kidnapped husband.
                Cut off from her team, she turns to her underworld contacts to
                survive and help locate the coveted intelligence that the
                kidnappers want.
              </p>
             <div className="ft-span">
             <div className="span-icon"><Clock4 /><p>Runtime: 103 minutes</p></div>
             <div className="span-icon"><CalendarDays absoluteStrokeWidth /><p>Release Date: 10/10/2024</p></div>
             </div>
            </div>
          </div>

          <div className="featured-method">
            <div className="row-1">
            <img src={ft4} alt="Top level CIA agent"></img>
            </div>
            <div className="row-2">
              <h2>Joker: Folie à Deux</h2>
              <p>
                While struggling with his dual identity, Arthur Fleck not only
                stumbles upon true love, but also finds the music that's always
                been inside him.
              </p>
              <div className="ft-span">
             <div className="span-icon"><Clock4 /><p>Runtime: 103 minutes</p></div>
             <div className="span-icon"><CalendarDays absoluteStrokeWidth /><p>Release Date: 10/10/2024</p></div>
             </div>
            </div>
          </div>

          <div className="featured-method">
            <div className="row-1">
            <img src={ft5} alt="Top level CIA agent"></img>
            </div>
            <div className="row-2">
              <h2>Cash Out</h2>
              <p>
                Criminal mastermind Mason is about to execute the score of a
                lifetime when his lover and key member of his crew, Decker,
                takes the team down and reveals she’s an undercover Interpol
                agent. Heartbroken, Mason escapes and retires from the life of
                crime until his younger brother Shawn is out of his league
                taking on a big bank heist all on his own. Mason has no choice
                left but to come to the rescue, while Interpol brings Decker in
                hoping to unnerve him. Before the SWAT teams storm the bank,
                Mason must use every tool in his arsenal to not only escape with
                the prize, but also the love of his life.
              </p>
              <div className="ft-span">
             <div className="span-icon"><Clock4 /><p>Runtime: 103 minutes</p></div>
             <div className="span-icon"><CalendarDays absoluteStrokeWidth /><p>Release Date: 10/10/2024</p></div>
             </div>
            </div>
          </div>

          <div className="featured-method">
            <div className="row-1">
            <img src={ft2} alt="Top level CIA agent"></img>
            </div>
            <div className="row-2">
              <h2>Freedom</h2>
              <p>
              Inspired by the true events of one of France's most notorious non-violent robbers, Bruno Sulak, in the 1980s. He led multiple heists, then captured public attention for his many daring escapes from police custody...always to reunite with his beloved lover and accomplice Annie, becoming both France's Public Enemy #1 and an icon of Freedom.
              </p>
              <div className="ft-span">
             <div className="span-icon"><Clock4 /><p>Runtime: 103 minutes</p></div>
             <div className="span-icon"><CalendarDays absoluteStrokeWidth /><p>Release Date: 10/10/2024</p></div>
             </div>
            </div>
          </div>

          <div className="featured-method">
            <div className="row-1">
            <img src={ft3} alt="Top level CIA agent"></img>
            </div>
            <div className="row-2">
              <h2>Let Go</h2>
              <p>
              Inspired by the true events of one of France's most notorious non-violent robbers, Bruno Sulak, in the 1980s. He led multiple heists, then captured public attention for his many daring escapes from police custody...always to reunite with his beloved lover and accomplice Annie, becoming both France's Public Enemy #1 and an icon of Freedom.
              </p>
              <div className="ft-span">
             <div className="span-icon"><Clock4 /><p>Runtime: 103 minutes</p></div>
             <div className="span-icon"><CalendarDays absoluteStrokeWidth /><p>Release Date: 10/10/2024</p></div>
             </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </div>
  );

}

export default Home;
