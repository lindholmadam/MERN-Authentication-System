import ContentContainer from '../components/homeScreenAccount/ContentContainer';


const HomeScreenAccount = () => {

  return (
    <>
      <div
        className='text-center bg-image position-relative' // Added 'position-relative' class
        style={{
          height: '100vh',
          backgroundImage: "url('https://images.unsplash.com/photo-1615715325952-0e8e849c72b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom'
        }}
      >
        <ContentContainer>
          <h1 className='my-4 text-white pt-5'>Välkommen, du är inloggad!</h1>
        </ContentContainer>
      </div>
    </>
  );
};

export default HomeScreenAccount;