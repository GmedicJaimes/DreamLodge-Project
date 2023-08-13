import React, { useState } from "react";
import styles from "./TutorialPost.module.css"; 
import { useNavigate } from "react-router-dom";

const TutorialPost = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartTutorial = () => {
    setCurrentStep(1);
  };

  const handleSkipTutorial = () => {
    navigate("/post");
  };

  const renderStepContent = () => {
    switch (currentStep) {
        case 0:
        return (
          <div className={styles.stepContent}>
            <h3>Would you like to do the tutorial to publish a property?</h3>
            <p>Embark on a journey to bring your property dreams to life! Our interactive tutorial will guide you step by step through the exciting process of creating your very own property listing. Whether it's a cozy apartment, a spacious villa, or a charming cottage, we've got you covered.</p>
            <p>Don't miss out on this opportunity to showcase your property in the best light and attract potential guests or buyers. Let's get started on making your property shine!</p>
            <div className={styles.buttonContainer}>
              <button onClick={handleStartTutorial}>Yes</button>
              <button onClick={handleSkipTutorial}>No</button>
            </div>
          </div>
        );
        case 1:
            return (
                <div className={styles.stepContent}>
                <h3>Step 1: Unleash Your Creativity</h3>
                <p>Welcome to the first step of creating your property listing! This is your chance to let your imagination run wild and choose a name that captures the essence of your unique property.</p>
                <p>Imagine your property as a story waiting to be told – a name that not only stands out but also paints a vivid picture in the minds of your potential guests or buyers. Whether it's a name that reflects the stunning views, the cozy interiors, or the vibrant neighborhood, let it be a reflection of what makes your property one-of-a-kind.</p>
                <p>Your property's name will be the first thing that captures the attention of anyone browsing through listings. So, take a moment, let your creativity flow, and choose a name that truly resonates with your property's character and charm.</p></div>
        );
        case 2:
            return (
            <div className={styles.stepContent}><h3>Step 2: Choose Your Property's Identity</h3>
            <p>Now that you've given your property a captivating name, it's time to define its identity. Think of the type of experience you want to offer your guests or buyers.</p>
            <p>Is your property nestled in the serene countryside, offering tranquility and nature's beauty? Or perhaps it's a luxurious mansion with lavish amenities, perfect for a grand getaway. Maybe it's a cozy cabin where the warmth of the fireplace creates unforgettable memories.</p>
            <p>If your property is a beachfront paradise where the sound of waves is your lullaby, or a chic urban apartment that puts guests in the heart of the action, choose the type that best captures its essence.</p>
            <p>Your property's type will set the expectations for your visitors. It will help them visualize the experience they can have when they step through the door. So go ahead, explore your property's personality, and select the type that speaks to you!</p></div>
        );
        case 3:
            return (
            <div className={styles.stepContent}><h3>Step 3: Choose Your Property's Perfect Spot</h3>
            <p>Now that your property has a name and a defined identity, it's time to pinpoint its location. The right location can make all the difference in creating a memorable experience for your guests or buyers.</p>
            <p>Is your property perched on a cliff overlooking the endless ocean? Or is it tucked away in a quaint countryside village, surrounded by rolling hills? Perhaps it's a hidden gem in the heart of a bustling city, offering convenient access to entertainment and culture.</p>
            <p>Think about the surroundings you want your guests to wake up to, explore, and enjoy. Consider the nearby attractions, natural beauty, and accessibility. A property's location is not just about coordinates; it's about creating an unforgettable experience.</p>
            <p>Take your time and choose a location that resonates with the identity you've chosen for your property. Remember, it's all about offering a unique and unforgettable stay.</p></div>
            )
        case 4:
            return (
            <div className={styles.stepContent}><h3>Step 4: Elevate Your Property with Services</h3>
            <p>Congratulations on coming this far! Your property is taking shape and gaining character. Now, it's time to make it even more inviting and attractive by offering a range of services that will cater to your guests' needs and desires.</p>
            <p>Consider what amenities and services will enhance the overall experience of staying at your property. Are you providing a cozy cabin getaway? Think about adding services like a private chef, daily housekeeping, or guided nature hikes.</p>
            <p>If your property is a luxurious mansion, consider offering spa treatments, chauffeur services, and gourmet dining experiences. Beachfront properties could offer water sports, beachside barbecues, and sunset yoga sessions.</p>
            <p>The services you choose should align with the type and identity of your property. Think about what will make your guests feel pampered, relaxed, and immersed in their surroundings.</p>
            <p>Don't forget to include both basic necessities and unique experiences that will set your property apart from the rest. Every service you provide contributes to the story your property tells.</p></div>
            );
        case 5:
            return (
            <div className={styles.stepContent}> <h3>Step 6: Create Comfortable and Inviting Spaces</h3>
            <p>Welcome to the step where you'll define the rooms that make up your rental property. Each room contributes to the overall experience your guests will have, so let's make them comfortable, stylish, and inviting!</p>
            <p>Think about the layout of your property. Start with the essentials, like bedrooms, living rooms, and bathrooms. How many of each type of room does your property have? Consider the size and capacity of each room. Is there a master suite with a private balcony? A cozy reading nook in the living area? A spacious dining room for communal meals?</p>
            <p>Remember that each room should reflect the theme and ambiance of your property. Use your style guide to ensure a consistent look and feel throughout. Consider the color palette, furnishings, and decor that will create a cohesive and harmonious environment.</p>
            <p>When describing each room, highlight its unique features. Does the bedroom have a window with a breathtaking view? Does the living room feature a fireplace for cozy evenings? Provide details that will make potential guests excited to experience each space.</p>
            <p>As you select and describe the rooms, think about the needs and preferences of your target audience. Are you catering to families, couples, or groups of friends? Tailor the rooms to provide convenience and comfort for your guests.</p>
            <p>Ready to bring your rooms to life? Let's continue creating a property that offers memorable experiences for your future guests!</p></div>
            );
        case 6:
            return (
            <div className={styles.stepContent}> <h3>Step 7: Set the Perfect Price</h3>
            <p>Welcome to the step where you'll determine the price per night for your rental property. Setting the right price is a crucial decision that can attract guests and maximize your revenue. Let's find the sweet spot that reflects the value of your property and meets the expectations of your target audience.</p>
            <p>Consider several factors when deciding on the price. Start by researching similar properties in your area to understand the market rates. Look at properties with similar features, amenities, and location. This will give you an idea of the competitive landscape and help you position your property effectively.</p>
            <p>Think about the unique selling points of your property. Does it offer breathtaking views, luxurious amenities, or convenient access to attractions? These features can justify a higher price point. On the other hand, if you're targeting budget-conscious travelers, a more affordable price might attract more bookings.</p>
            <p>Keep in mind the costs associated with maintaining and managing the property, such as cleaning, maintenance, and utility bills. Factor in these expenses to ensure that your pricing is sustainable and profitable.</p>
            <p>Remember that pricing is not set in stone. You can adjust it over time based on guest feedback, booking patterns, and market trends. Dynamic pricing strategies can also help you optimize your rates based on demand and seasonality.</p>
            <p>It's important to note that our platform will apply a 5% service fee to the price you indicate. This fee helps cover maintenance costs and advertising expenses for the website. Additionally, the earnings from your bookings will be deposited to your account within the first 5 business days of the following month. For example, if you have bookings in August, your total earnings will be processed and deposited to your account within the first 5 business days of September.</p>
            <p>Ready to determine the perfect price for your property? Let's make sure it's competitive, attractive, and aligned with the value you offer to your future guests.</p>
           
            </div>
            );
      default:
        return null;
    }
  };

  return (
    <div className={styles.tutorialContainer}>
      <h2>Create a Property Tutorial</h2>
      {renderStepContent()}
      {currentStep !== 0 && (
        <div className={styles.buttonContainer}>
          <button onClick={handlePrevStep} disabled={currentStep <= 1}>
            Previous
          </button>
          {currentStep !== 6 && (
            <button onClick={handleNextStep} disabled={currentStep === 6}>
              Next
            </button>
          )}
          {currentStep === 6 && (
            <button className={styles.publishButton} onClick={handleSkipTutorial}>
              Now you are ready to publish!
            </button>
          )}
        </div>
      )}
    </div>
  );
  
};

export default TutorialPost;
