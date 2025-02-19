import ContentContainer from '../components/homeScreenAccount/ContentContainer';
import { Card, Image } from 'react-bootstrap';
import imageOne from '../assets/images/stepOne.png';
import imageTwo from '../assets/images/stepTwo.png';
import imageThree from '../assets/images/stepThree.png';
import imageFour from '../assets/images/stepFour.png';
import imageFive from '../assets/images/stepFive.png';


const OnboardingScreen = () => {


  
  return (
    <>
      <ContentContainer>
        <h1>Så funkar det</h1>
        <Card className="mb-3">
          <Card.Header>Steg 1: Planering</Card.Header>
          <Card.Body>
            <Image src={imageOne} alt="Planering" className="img-fluid mb-3"/>
            <Card.Text>
              Börja med att planera din flytt i god tid. Gör en checklista över vad som behöver packas och organiseras.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Header>Steg 2: Förpackning</Card.Header>
          <Card.Body>
            <Image src={imageTwo} alt="Förpackning" className="img-fluid mb-3"/>
            <Card.Text>
              Packa dina saker noggrant. Märk lådorna med innehåll och vilket rum de ska till i det nya hemmet.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Header>Steg 3: Transport</Card.Header>
          <Card.Body>
            <Image src={imageThree} alt="Transport" className="img-fluid mb-3"/>
            <Card.Text>
              Använd en pålitlig flyttfirma eller transportera själv. Se till att allt är säkert och väl skyddat under transporten.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Header>Steg 4: Uppackning och organisering</Card.Header>
          <Card.Body>
            <Image src={imageFour} alt="Uppackning och organisering" className="img-fluid mb-3"/>
            <Card.Text>
              När du anländer till ditt nya hem, börja med att packa upp de viktigaste sakerna först och organisera ditt utrymme.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Header>Steg 5: Avslutande</Card.Header>
          <Card.Body>
            <Image src={imageFive} alt="Avslutande" className="img-fluid mb-3"/>
            <Card.Text>
              Gör en sista kontroll för att se till att allt är på plats och att du inte har glömt något på den gamla adressen.
            </Card.Text>
          </Card.Body>
        </Card>
      </ContentContainer>
    </>
  );
};

export default OnboardingScreen;