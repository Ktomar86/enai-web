import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from './components/Navigation';

export const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const termsOfServiceText = `Welcome to Enai
Thanks for using our products and services ("Service"). The Service is provided by Enai Limited ("Enai", "we", "us" or "our"), located at Unit 3, Bradbury's Court, Lyon Rd, London HA1 2BY, UK. By using our Service, you are agreeing to these terms. Please read them carefully.

1. Description of Service
Enai provides you with access to advanced AI-powered tools that can be accessed via a web interface. You understand that the Service may include certain communications from Enai, such as service announcements and administrative messages related to the provision of the Service. Unless explicitly stated otherwise, any new features or tools released by us in relation to the Service shall be subject to this Agreement.
The Service is an online product that requires access via an internet or other network connection. You are responsible for obtaining the necessary internet or network connection to access Enai's Service and for the associated third-party fees (such as internet service provider or airtime charges) for connectivity. Additionally, you are responsible for procuring and maintaining all equipment necessary to connect to the Service. The quality of the Service you experience may depend on your connectivity and equipment. Enai is not responsible for any claims or losses arising as a result of your connectivity or equipment.

2. Registration and Use of Service
As a registered user of Enai's Service, you represent that you are of legal age to form a binding contract. You agree to:
Provide true, accurate, current, and complete information about yourself as prompted by the Service's registration form ("Registration Data").
2.1 Maintain and promptly update the Registration Data to keep it true, accurate, current, and complete.
2.2 If you provide any information that is untrue, inaccurate, not current, or incomplete, or if Enai has reasonable grounds to suspect such information, Enai has the right to suspend or terminate your account and refuse any and all current or future use of the Service (or any portion thereof).
By using the Service, you represent and warrant that you have all the relevant rights and permissions (including intellectual property rights) to the information provided by you in the course of using the Service. You shall assume sole liability for such information. You further agree not to use the Service to build a similar or competitive work.

3. No Resale or Redistribution of Service
You are permitted to use the Service internally within your company for outreach and related purposes. Except as expressly authorised by Enai, you agree not to reproduce, duplicate, copy, sell, trade, resell, permit access, transfer, assign, modify, create derivative works, or exploit for any commercial purposes any portion of the Service, use of the Service, or access to the Service or its underlying code. You are responsible for all use made of the Service using your account credentials. You are responsible for maintaining the confidentiality of your online account credentials.

4. Intellectual Property
Using our Service does not give you ownership of any intellectual property rights in the Service or the content you access. All materials and intellectual property rights in respect of the Services provided (including all underlying technology, modifications, and work products created in or arising from the same) shall remain the property of Enai. For the avoidance of doubt, no other rights except access to the Service are granted.

5. Account Access
You must provide a valid email address and any other information requested to complete the registration process. Account registration must be completed by a human. Accounts registered by "bots" or other automated methods are not permitted. Your login may only be used by a single user; a single login shared by multiple users is prohibited.
We reserve the right to cancel or suspend your access to the Service if we detect suspicious activity reasonably indicating that you have willingly and/or knowingly shared your credentials with another user. You are responsible for maintaining the security of your account and password. Enai cannot and will not be liable for any loss or damage resulting from your failure to comply with this obligation.

6. Service and Marketing Messages
By registering an account with Enai, you give us permission to send email notifications to the email address specified during registration. These emails may include updates to Enai's products, tips and tutorials on using Enai tools, and system messages. You have the option to subscribe to promotional offers and weekly updates from our blog, though this is not mandatory. You may opt out of optional emails at any time by using the 'Unsubscribe' link included in each email.

7. Unauthorised Uses
You must not:
7.1 Modify, adapt, or hack the Service.
7.2 Reverse engineer, decompile, or reuse the source code provided in relation to the Service.
7.3 Transmit worms, viruses, or malicious code.
7.4 Interfere or disrupt the integrity, security, or performance of the Service.
7.5 Access the Service using methods other than the provided interface.
Automated tools (such as bots) may only access the Service via Enai's official Application Program Interfaces (APIs). Unlawful attempts to access our Service, website, server, or database are strictly prohibited. We reserve the right to terminate, suspend, or block access for violations.

8. Blocking of IP Addresses
To protect the integrity of the Service, Enai reserves the right to block certain IP addresses from accessing the Service. If you believe your IP address has been blocked mistakenly, you may contact us at enai.ai2024@gmail.com.

9. Taxes and Fees
All prices and charges for our Service are exclusive of taxes and fees. Where applicable, taxes and fees will be added to invoices. Enai reserves the right to calculate and modify these amounts without prior notice. If you are exempt from taxes, you must provide valid tax exemption documentation. You are solely responsible for paying taxes and fees owed to relevant authorities.

10. Refund Policy
Unless required by law, Enai is not obligated to provide a refund for any reason.

11. Cancellation of Service
By Enai: Enai reserves the right to cancel the Service if:
11.1You breach these terms.
11.2 Unauthorised usage patterns are detected.
11.3 You attempt to damage or harm our Service or reputation.
11.4 Required by law enforcement or public agencies.
11.5 Insolvency, bankruptcy, or similar proceedings are initiated against you.
By User: Contracts automatically renew at the end of the initial term unless written notice is provided at least five days before renewal.

12. Data Collection and Use
You agree that Enai may anonymise and aggregate data you share with the Service and use it without identifying you to improve the Service.

13. Modifications to Service
We are constantly improving the Service. Enai may add, remove, or modify features or suspend the Service altogether without liability to you. Pricing or subscription plans may also change at our discretion.

14. Links
The Service may include links to third-party websites. Enai does not control these websites and is not responsible for their availability, content, or any damages arising from their use.

15. Indemnity
You agree to indemnify and hold harmless Enai and its officers, employees, and agents from claims, liabilities, damages, and expenses arising from:
Your breach of these terms.
Intellectual property infringements related to your actions.
Your violation of applicable laws.

16. Liability for Our Service
The Service is provided "AS IS" without warranty. To the extent permitted by law, Enai disclaims all implied warranties and is not liable for:
16.1 Loss of profits, revenue, data, or business opportunities.
16.2 Direct, indirect, incidental, or consequential damages.
16.3 Total liability exceeding the amount you paid for the Service in the 12 months preceding the claim.

17. Regulatory Compliance
You represent and warrant compliance with all applicable laws, including export controls and sanctions, in your use of the Service.

18. Contacting Enai
Enai may be contacted via email at enai.ai2024@gmail.com. By contacting us, you grant Enai the right to use any ideas or materials shared unless expressly reserved by you in writing.

19. About These Terms
Enai may modify these terms to reflect changes in the law or the Service. Changes will not apply retroactively and will become effective no sooner than seven days after posting. Continued use of the Service indicates your acceptance of the modified terms.
These terms are governed by the laws of England (UK). Disputes will be resolved in English courts.`;

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark to-dark-800">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/"
            className="inline-flex items-center text-gray-300 hover:text-primary-400 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="gradient-text">Terms of Service</span>
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert">
            <div className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
              {termsOfServiceText}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};