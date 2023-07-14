import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CardComponent = () => {
  return (
    <Card className="bg-white rounded-lg shadow-lg p-5" data-projection-id="1883">
      <div className="d-flex justify-content-between align-items-center">
        <div className="w-20 h-12 border border-gray-100 overflow-hidden p-3 rounded-md">
          <Card.Img className="w-100 h-100 object-contain" src="https://do6a5aygez55q.cloudfront.net/queues/48x/38.png" alt="logo" />
        </div>
        <div>
          <div className="flex ml-12 items-center float-right text-red">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0">
              <path d="M12 9v4m-1.75-8.81L2.63 18a2 2 0 0 0 1.75 3h15.24a2 2 0 0 0 1.75-3L13.75 4.19a2 2 0 0 0-3.5 0Z"></path>
              <path strokeWidth="2.5" d="M12 17h0"></path>
            </svg>
            <span className="text-sm font-medium ml-1 float-right">Redan registrerad</span>
          </div>
        </div>
      </div>
      <div className="mt-3 mb-6">
        <Card.Title className="text-lg leading-tight font-medium text-gray-900 truncate d-flex align-items-center">ByggVesta</Card.Title>
        <Card.Text className="line-clamp-2 text-sm mt-1 text-gray-500">
          Hos Byggvesta hittar du moderna, miljövänliga och trivsamma hyresrätter och studentlägenheter i Sveriges största städer. ByggVesta är en innovatör som utvecklar, bygger, förvaltar och investerar i nya hållbara bostäder.
        </Card.Text>
      </div>
      <a href="/minakoer/byggvesta">
        <Button className="font-medium w-full h-10 text-sm rounded-md bg-brand-50 text-brand hover:bg-brand-100 active:bg-brand-50 disabled:bg-brand-50 disabled:opacity-60">
          <span className="d-flex align-items-center">Åtgärda</span>
        </Button>
      </a>
    </Card>
  );
};

export default CardComponent;
