import React from "react";
import { Link } from "react-router-dom";

//components
// import NavBar from "components/homePartials/newNavbar";
import Navbar from "components/dock/Navbar";

//style
import "./index.css";

const Terms = (): JSX.Element => {
  return (
    <>
      <Navbar isNav={false} />

      <div className="globe-green-bg"></div>
      <div className="lg:px-36 lg:mx-0 mx-5">
        <div className="terms-card md:p-12 p-5 mb-32">
          <h3 className="text-2xl black-text font-semibold uppercase">
            Terms and Conditions of Service
          </h3>

          <div className="text-sm black-text md:my-10 my-5">
            <div className="">
              <p className="black-text text-lg mb-2 font-semibold  uppercase">
                1. introduction
              </p>

              <p className="mb-2">
                These terms and conditions of service (“Terms”) constitute a
                legally binding contract between the "Company" and the
                "Customer". These Terms apply to any and all logistics services
                provided by the Company to the Customer unless the Company and
                the Customer expressly negotiate different terms by concluding a
                separate contract. In the event the Company renders services and
                issues a document containing terms and conditions governing such
                services, including, but not limited to, a combined transport
                bill of lading, air waybill, or warehouse receipt, the terms and
                conditions set forth in such other document(s) shall govern
                those services.{" "}
              </p>
              <p className="mb-2">
                These Terms apply in full force and effect to your use of our
                services and by using any of our services, you expressly accept
                all terms and conditions contained herein in full and without
                limitation or qualification. We oblige you therefore to
                thoroughly read these Terms carefully before agreeing to be
                bound by it. You must not use any of our services, if you have
                any objection to any of these Terms.
              </p>
            </div>
            <div className="my-4">
              <p className="black-text text-lg mb-2 font-semibold  uppercase">
                2. definition
              </p>
              <p className="mb-2">
                In this Terms, the following terms are used as follows:
              </p>
              <p className="mb-2">
                "Company" shall mean{" "}
                <span className="uppercase font-semibold">
                  ONEPORT 365 INC.
                </span>
                , its subsidiaries, related companies, agents and/or
                representatives;
              </p>
              <p className="mb-2">
                "Customer" shall mean you or the person for which the Company is
                rendering service, as well as its agents and/or representatives,
                including, but not limited to, shippers, importers, exporters,
                carriers, secured parties, warehousemen, buyers and/or sellers,
                shipper's agents, insurers and underwriters, break-bulk agents,
                consignees, etc. It is the responsibility of the Customer to
                provide notice and copy(s) of these terms and conditions of
                service to all such agents or representatives;
              </p>
              <p className="mb-2">
                "Documentation" shall mean all information received directly or
                indirectly from Customer, whether in paper or electronic form;
              </p>

              <p className="mb-2">
                "Ocean Transportation Intermediaries" ("OTI") shall include an
                "ocean freight forwarder" and a "non-vessel operating carrier";
              </p>
              <p className="mb-2">
                "Third Party(ies)" shall include, but not be limited to, the
                following: "carriers, truckmen, cartmen, lightermen, forwarders,
                OTI, customs brokers, agents, warehousemen and others to which
                the goods are entrusted for transportation, cartage, handling
                and/or delivery and/or storage or otherwise".
              </p>
            </div>
            <div className="">
              <p className="black-text text-lg mb-2 font-semibold  uppercase">
                3. Privacy policy
              </p>
              <p className="mb-2">
                We have adopted a 
                <Link
                  to="/privacy-policy"
                  target={"_blank"}
                  className="underline italic"
                >
                  Privacy Policy
                </Link>{" "}
                that you should refer to in order to fully understand how we
                collect and use your information. The Privacy Policy is hereby
                incorporated into these Terms by reference
              </p>
            </div>
            <div className="my-4">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                4. Eligibility
              </p>
              <p className="mb-2">
                By agreeing on to use our services, you are warranting that you
                are not a person barred from receiving services under the laws
                of the applicable jurisdiction. You also undertake and agree to
                provide us with information which is accurate, and not to
                misrepresent your identity or your user information. You are
                only entitled to access and use the Services for lawful purposes
              </p>
            </div>
            <div className="">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                5. Company as agent
              </p>
              <p className="mb-2">
                The Company acts as the agent of the Customer for the purpose of
                performing duties in connection with the entry and release of
                goods, post entry services, the securing of export licenses, the
                filing of export and security documentation on behalf of the
                Customer and other dealings with Government Agencies, or for
                arranging transportation services, both domestically and
                internationally, or other logistics services in any capacity
                other than as carrier
              </p>
            </div>
            <div className="my-4">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                6. Third party service
              </p>
              <p className="mb-2">
                Unless the Company carries, stores or otherwise physically
                handles the goods or cargo or shipment, and loss, damage,
                expense or delay occurs during such activity, the Company
                assumes no liability as a carrier and is not to be held
                responsible for any loss, damage, expense or delay to the goods
                to be forwarded or imported except as provided in Paragraph 11
                and subject to the limitations of Paragraph 14 below, but
                undertakes only to use reasonable care in the selection of
                carriers, truckers, ground handlers, forwarders, customs
                brokers, agents, OTI, warehousemen, lightermen and others to
                whom it may entrust the goods for transportation, cartage,
                handling and/or delivery and/or storage or otherwise.
              </p>
              <p className="mb-2">
                When the Company carries, stores or otherwise physically handles
                the goods, it does so subject to the limitations of Paragraph 14
                below, unless a separate air waybill, CMR, bill of lading, or
                other contract of carriage is issued by the Company, in which
                event the terms thereof shall govern.
              </p>
            </div>
            <div className="">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                7. LIMITATION OF THIRD PARTY LIABILITY
              </p>
              <p className="mb-2">
                7.1 The Company is authorized to select and engage carriers,
                truckmen, lightermen, forwarders, customs brokers, agents, OTI,
                warehousemen and others, as required, to transport, store, deal
                with and deliver the Goods, all of whom shall be considered the
                agents of the Company, and the Goods may be entrusted to such
                agencies subject to all conditions as to limitations of
                liability for loss, damage, expense or delay and to all rules,
                regulations, requirements and conditions, whether printed,
                written or stamped, appearing in air waybills, bills of lading,
                other transport documents, receipts or tariffs issued by such
                carriers, truck men, lightermen, forwarders, customs brokers,
                agents, warehousemen, and others.
              </p>
              <p className="mb-2">
                7.2 The Company shall under no circumstances be liable for any
                loss, damage, expense or delay to the Goods for any reason
                whatsoever when said Goods are in the custody, possession or
                control of third parties selected by the Company to forward,
                enter, clear, transport or render other services with respect to
                such Goods.
              </p>
            </div>
            <div className="my-4">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                8. COMMUNICATION
              </p>
              <p className="mb-2">
                8.1 The Customer warrants that each and every of the
                Instructions given to the Company is lawful, valid and
                performable. The Customer further warrants that the information
                provided to the Company concerning the Goods is sufficient and
                correct.
              </p>
              <p className="mb-2">
                8.2 Any instructions provided by the Customer to the Company
                will be valid only if given in writing, acknowledged by the
                Company in writing and given in sufficient time in all the
                circumstances for the Company reasonably to be able to adopt the
                instructions. Instructions provided by any means other than in
                writing, or instructions given late, even if received by the
                Company without comment, shall not be binding upon the Company.
                No attempt by the Company to adopt late instructions will
                constitute an acceptance by the Company or affect the validity
                of those instructions.
              </p>
              <p className="mb-2">
                8.3 Notwithstanding any prior dealings between the Company and
                the Customer or any rule of law or equity or provision of any
                statute or regulation to the contrary, or any contracts,
                documents and other matter (including cash, cheques, bank drafts
                and other remittances) sent to the Company through the post
                shall be deemed not to have been received by the Company unless
                and until they are actually delivered to the Company at its
                office address or placed in the Company's post office box, if so
                addressed.
              </p>
              <p className="mb-2">
                8.4 Except under special arrangements previously made in
                writing, the Customer warrants that the goods are not the
                dangerous goods as defined under binding documents such as laws,
                regulations, international conventions, nor are other goods
                likely to cause damage. Should the Customer nevertheless deliver
                any such goods to the Company or cause the Company to accept or
                handle or deal with any such goods otherwise than under special
                arrangements previously made in writing, the Customer shall be
                liable for all expenses, losses, damages whatsoever caused,
                fines and claims in connection with the goods howsoever arising.
                The Company or other persons in actual control of the goods has
                the right to decide whether the goods are dangerous goods
                without notice to the Customer and shall be entitled to destroy
                or otherwise dispose of the goods at the risk and expenses of
                the Customer.
              </p>
            </div>
            <div className="">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                9. CHOOSING ROUTES, CARRIERS, AGENTS
              </p>
              <p className="mb-2">
                Unless express instructions in writing are received from the
                Customer, the Company has complete freedom in choosing the
                means, routes, carriers and procedures to be followed in the
                handling, transportation and delivery of the Goods.
              </p>
              <p className="mb-2 font-semibold ">QUOTATIONS NOT BINDING</p>
              <p className="mb-2">
                9.1 Quotations given are estimates only unless stated otherwise
                and thus are subject to fluctuation in third party charges owing
                to fuel, currency, security or other surcharges. Quotations or
                invoices stating the rates as firm, do not denote that the
                Company is acting as a principal.{" "}
              </p>
              <p className="mb-2">
                9.2 Quotations are given on the basis of immediate acceptance
                and are subject to withdrawal or revision at any time. Unless
                otherwise agreed in writing, the Company may, after acceptance
                of the quote, revise quotes or charges with or without notice to
                the Customer, in the event of changes beyond the Company’s
                control, such as, but not limited to: variance in the shipment’s
                declared weight and volume from given quotes, freight rates,
                various carrier surcharges, foreign exchange rates, fees of
                regulating bodies etc.
              </p>
              <p className="mb-2">
                9.3 The Customer shall pay the Company in cash, or as otherwise
                agreed to in writing, all costs when due, immediately and
                without reduction or deferment on account of any claim,
                counterclaim or set off.
              </p>
              <p className="mb-2">
                9.4 Monies owing to the Company that are overdue beyond thirty
                (30) days of the invoice date or past dates mutually agreed to
                in any written service agreement between the Company and
                Customer, are subject to interest charges at 0.5% per day during
                the period that such amounts are overdue or highest rate
                permissible by applicable law.
              </p>
              <p className="mb-2">
                9.5 The Company shall be entitled to be paid, and retain, all
                brokerages, commissions, allowances and other remunerations
                customarily retained by or paid to freight forwarders.
              </p>
            </div>
            <div className="my-4">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                10. DETENTION AND LIEN
              </p>
              <p className="mb-2">
                10.1 The Company shall have a particular and general lien and
                right of detention on all goods or documents relating to goods
                in its possession in respect of all monies owing for services,
                at any time from the Customer, shipper or consignee. After
                giving twenty-one (21) days written notice to the Customer, the
                Company shall be entitled to sell or dispose of such goods or
                documents at the sole discretion of the Company and the expense
                of the Customer.{" "}
              </p>
              <p className="mb-2">
                10.2 Net proceeds of sale of such goods will be applied first to
                all outstanding amounts and the residual amount shall be
                credited to the Customer, shipper or consignee as the case may
                be. The Company will not be liable for any reduction in value,
                for whatever reason, received on the sale of the seized goods.
                In the event the sale of such goods does not adequately cover
                the cost of amounts owing to the Company, the Customer will
                remain liable to the Company for the balance owing.
              </p>
              <p className="mb-2">
                10.3 The Company shall have a general and continuing lien on any
                and all property and documents relating thereto of Customer
                coming into Company's actual or constructive possession, custody
                or control or enroute, which lien shall survive delivery, for
                all charges, expenses or advancements owed to Company with
                regard to the shipment on which the lien is claimed, a prior
                shipment(s) and/or both. Customs duties, transportation charges,
                and related payments advanced by the Company shall be deemed
                paid in trust on behalf of the Customer and treated as pass
                through payments made on behalf of the Customer for which the
                Company is acting as a mere conduit.;
              </p>
              <p className="mb-2">
                10.4 The Company shall provide written notice to Customer of its
                intent to exercise such lien, the exact amount of monies due and
                owing, as well as any on-going storage or other charges;
                Customer shall notify all parties having an interest in its
                shipment(s) of Company's rights and/or the exercise of such
                lien.
              </p>
              <p className="mb-2">
                10.5 Unless, within thirty (30) days of receiving notice of
                lien, Customer posts cash or letter of credit at sight, or, if
                the amount due is in dispute, an acceptable bond equal to 110%
                of the value of the total amount due, in favor of Company,
                guaranteeing payment of the monies owed, plus all storage
                charges accrued or to be accrued, Company shall have the right
                to sell such shipment(s) at public or private sale or auction at
                the expense of the Customer.
              </p>
              <p className="mb-2">
                10.6 Net proceeds of sale of such goods will be applied first to
                all outstanding amounts and the residual amount shall be
                credited to the Customer, shipper or consignee as the case may
                be. The Company will not be liable for any reduction in value,
                for whatever reason, received on the sale of the seized goods.
                In the event the sale of such goods does not adequately cover
                the cost of amounts owing to the Company, the Customer will
                remain liable to the Company for the balance owing.
              </p>
            </div>
            <div className="">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                11. DECLARING HIGHER VALUE
              </p>
              <p className="mb-2">
                Inasmuch as Third Party service providers to whom the goods are
                entrusted usually limit their liability for loss or damage
                unless a higher value is declared and the charge based on such
                higher value is accepted by any such Third Party, the Company
                must receive specific written instructions from the Customer to
                pay such higher charge based on valuation and any such Party,
                must accept such higher declared value; otherwise the valuation
                placed by the Customer on the goods shall be considered solely
                for export or customs purposes and the goods will be delivered
                to the Third Party, subject to the terms of the Third Party’s
                limitations of liability and/or terms and conditions of service.
              </p>
            </div>
            <div className="my-4">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                12. Insurance
              </p>
              <p className="mb-2">
                12.1 Unless requested to do so in writing in sufficient time
                prior to shipment from point of origin and confirmed to Customer
                in writing, Company is under no obligation to procure insurance
                on Customer's behalf. The Company does not undertake or warrant
                that such insurance can or will be placed. Unless the Customer
                has its own open marine policy and instructs the Company to
                effect insurance under such policy, insurance is to be effected
                with one or more insurance companies or other underwriters to be
                selected by the Company.{" "}
              </p>
              <p className="mb-2">
                12.2 Any insurance placed shall be governed by the certificate
                or policy issued and will only be effective when accepted by
                such insurance companies or underwriters. In all cases, Customer
                shall pay all premiums and costs in connection with procuring
                requested insurance.
              </p>
              <p className="mb-2">
                12.3 Should an insurer dispute its liability for any reason, the
                insured shall have recourse against the insurer only and the
                Company shall not be under any responsibility or liability in
                relation thereto, notwithstanding that the premium upon the
                policy may not be at the same rates as that charged or paid to
                the Company by the Customer or that the shipment was insured
                under a policy in the name of the Company.{" "}
              </p>
              <p className="mb-2">
                12.4 If for any reason the goods are held in warehouse, or
                elsewhere, the same will not be covered by insurance, unless the
                Company receives specific written instructions from the Customer
                and the Company confirms in writing.{" "}
              </p>
              <p className="mb-2">
                12.5 Unless specifically agreed in writing, the Company assumes
                no responsibility to effect insurance on any export or import
                shipment that it does not handle.
              </p>
              <p className="mb-2">
                12.6 Should the Customer decline cargo insurance coverage
                whether through the Company or elsewhere, the Company has no
                liability for the loss of or damage to any goods during
                transport or storage that could have been covered by cargo
                insurance, whether or not the Company caused or contributed to
                such loss or damage as a result of its negligence, breach of
                these Terms or otherwise.
              </p>
            </div>
            <div className="">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                13. NOTIFICATIONS OF CLAIM FOR LOSS OR DAMAGES
              </p>
              <p className="mb-2">
                13.1 The Customer must notify the Company of a claim in writing
                (the “Notice of Claim”) within the following time lines:{" "}
              </p>
              <div className="mb-2">
                <ol className="ml-10" style={{ listStyleType: "lower-alpha" }}>
                  <li>
                    For loss and/or damage, within seven (7) days of the
                    completion of transit.
                  </li>
                  <li>
                    For delay in delivery or non-delivery, within thirty (30)
                    days of the date when the goods should have been delivered.{" "}
                  </li>
                  <li>
                    For any other instance, within forty-five (45) days of the
                    event giving rise to the claim.
                  </li>
                </ol>
              </div>
              <p className="mb-2">
                13.2 If the Notice of Claim is not received within the required
                time frame, the claim will be deemed to be waived and thus void
                and the Company absolved of all liability.
              </p>
              <p className="mb-2">
                13.3 Giving a Notice of Claim to the Company does not constitute
                a notice of claim for cargo insurance if the Customer has
                arranged for this type of insurance either directly with the
                Company or through the use of a third-party insurance provider.
                The Customer is advised to consult the terms and conditions
                under its insurance policies, if any, in order to seek
                restitution therein.
              </p>
              <p className="mb-2">
                13.4 Customers are reminded that a signed delivery receipt
                indicating external damages noted upon delivery, will be
                required in order to consider any claim.
              </p>
            </div>
            <div className="my-4">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                14. LIABILITIES AND LIMITATIONS
              </p>
              <p className="mb-2">
                14.1 The Customer shall indemnify the Company against all
                duties, taxes, payments, fines, expenses, losses, damages and
                liability in excess of any agreed liability of the Company in
                accordance with these Terms, suffered or incurred by the Company
                in the performance of its Services to which these Terms apply.
              </p>
              <p className="mb-2">
                14.2 The Customer shall indemnify the Company in respect of any
                claim made against the Company as a result of providing the
                Services including of a general average nature.
              </p>
              <p className="mb-2">
                14.3 The Company’s maximum liability shall not in any event
                exceed 2 SDR (Special Drawing Rights) per kilogram of the gross
                weight of the goods that are the subject of the claim.
              </p>
              <p className="mb-2">
                14.4 Without prejudice to any other conditions contained herein,
                the Company will not be held liable for:{" "}
              </p>
              <div className="mb-2">
                <ol className="ml-10" style={{ listStyleType: "lower-alpha" }}>
                  <li>
                    Loss or damage for any cause, event or labour disruption,
                    whether legal or not, where the Company or its agents using
                    reasonable diligence could not avoid.
                  </li>
                  <li>
                    Indirect or consequential loss or damage including, but not
                    limited to: loss of market, loss of profit, revenue,
                    interest, loss of good will, business interruption, work
                    stoppage or other.
                  </li>
                  <li>
                    Loss of, damage to or consequential or indirect loss caused
                    by delay or deviation or “ad valorem” shipments or agreed
                    transit time in connection with the transportation of goods.
                  </li>
                </ol>
              </div>
              <p className="mb-2">
                14.5 The Customer shall indemnify the Company, its servants,
                sub-contractors and agents, from any liability in connection
                with the Services which are the subject of these Terms in excess
                of the liability of the Company in accordance with these Terms,
                against the following:{" "}
              </p>
              <div className="mb-2">
                <ol className="ml-10" style={{ listStyleType: "lower-alpha" }}>
                  <li>
                    all claims, costs and demands suffered or incurred by the
                    Company in the performance of its obligations regardless
                    whether such claims arise from or in connection with breach
                    of contract, negligence or breach of duty.
                  </li>
                  <li>
                    all duties, taxes, payments, fines, expenses, losses,
                    damages (including physical damage) and liabilities
                    including without limitation any storage, demurrage, port,
                    or terminal charges and any liability to indemnify any other
                    person against claims made against such other person by the
                    Customer or by the owner arising out of the Services or
                    arising from any breach by the Customer of any warranty
                    contained in these conditions or from the negligence of the
                    Customer. The confiscation or detention of the goods by any
                    governmental authority shall not affect or diminish the
                    liability of the Customer to the Company to pay all charges
                    or other money due promptly on demand.
                  </li>
                </ol>
              </div>
              <p className="mb-2">
                14.6 These Terms also apply wherever any claim is made against
                any employee, agent or independent contractor engaged by the
                Company to perform Services for the Customer, whether such
                claims are founded in contract or tort. The sum total liability
                of the Company and the aforementioned parties will not exceed
                the limits of liability contained within these Terms.
              </p>
            </div>
            <div className="">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                15. TIME BAR
              </p>
              <p className="mb-2">
                15.1The Company shall, unless otherwise expressly agreed to in
                writing by the Company, be discharged of all liability under
                these conditions unless suit is brought within 9 months from:{" "}
              </p>
              <div className="mb-2">
                <ol className="ml-10" style={{ listStyleType: "lower-alpha" }}>
                  <li>
                    the date of delivery of the goods for claim or damage to
                    goods; or
                  </li>
                  <li>
                    the date when the goods should have been delivered for
                    claims for delay in delivery or loss of goods. With respect
                    to loss or damage other than loss of or damage to the goods,
                    the 9-month period shall be counted from the time when the
                    act or omission of the Company giving rise to the claim
                    occurred.
                  </li>
                </ol>
              </div>
            </div>
            <div className="my-4">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                16. PRICING AND PAYMENT
              </p>
              <p className="mb-2">
                16.1 Rates and charges for the carriage of the shipment shall be
                based on actual, volumetric, pivot weight or other applicable
                chargeable weight, whichever is greater.
              </p>
              <p className="mb-2">
                16.2 The Customer shall tender payment to the Company
                immediately upon booking the shipment, unless the Company in its
                discretion determines to extend credit to the Customer.{" "}
              </p>
              <p className="mb-2">
                16.3 The Customer shall pay to the Company all sums immediately
                when due without deduction or deferment on account of any claim,
                counterclaim or set-off.{" "}
              </p>
              <p className="mb-2">
                16.4 On all amounts overdue to the Company, the Company shall be
                entitled to interest calculated on a daily basis from the date
                such accounts are overdue until payment thereof at 0.5% per day
                during the period that such amounts are overdue or highest rate
                permissible by applicable law.
              </p>
              <p className="mb-2">
                16.5 In any referral for collection or action against the
                Customer for the monies due the Company, upon recovery by the
                Company, the Customer shall pay the expenses of collection
                and/or litigation, including a reasonable attorney fee.
              </p>
              <p className="mb-2">
                16.6 The Customer shall absorb their own currency losses and own
                bank charges on remittance.
              </p>
            </div>
            <div className="">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                17. C.O.D OR CASH COLLECT SHIPMENTS
              </p>
              <p className="mb-2">
                17.1 The Company shall use reasonable care regarding written
                instructions relating to "Cash/Collect" on "Deliver (C.O.D.)"
                shipments, bank drafts, cashier's and/or certified checks,
                letter(s) of credit and other similar payment documents and/or
                instructions regarding collection of monies but shall have no
                liability if the bank or consignee or other recipient refuses to
                pay for the shipment.
              </p>
              <p className="mb-2">
                17.2 All payment documents tendered in payment of C.O.D.s will
                be accepted based solely upon the Customer’s assuming all risk
                relating thereto including, but not limited to, risk of
                non-payment, insufficient funds, and forgery, and the Company
                shall not be liable upon any such instrument. The Company will
                not be responsible for any delay in remittance lost in exchange,
                or during transmission or while in the course of collection.
              </p>
            </div>
            <div className="my-4">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                18. FORCE MAJEURE
              </p>
              <p className="mb-2">
                18.1 The Company shall not be liable for any delay in the
                performance or non-performance, in whole or in part, by the
                occurrence of any contingency beyond the reasonable control of
                the Company, including, but not limited to, fires, floods,
                weather, labor trouble, strikes, break-downs, riots, embargoes,
                the regulation, order, or requirement of any government, wars
                (whether or not an actual declaration thereof is made),
                hostilities, warlike operations, failure or delay in
                transportation caused by fire, flood, or act of any government
                or any agency or subdivision thereof, affecting conditions of
                these Agreement or otherwise, judicial action, accident,
                explosion, storms or other acts of God.
              </p>
              <p className="mb-2">
                18.2 Any such delay shall excuse the Company from performance
                and Company’s time for performance shall be extended for the
                period of delays and for a reasonable period thereafter.
              </p>
            </div>
            <div className="">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                19. SEVERABILITY
              </p>
              <p className="mb-2">
                If at any time, any term or provision in this Terms shall be
                held to be illegal, invalid, or unenforceable in whole or in
                part under any rule of law or enactment, such term or provision
                or part shall to that extent be deemed not to form part of this
                Terms, and the enforceability of the remainder of this Terms
                shall not be affected.
              </p>
            </div>
            <div className="my-4">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                20. GOVERNING LAW AND APPLICABLE JURISDICTION
              </p>
              <p className="mb-2">
                20.1 These terms and conditions of service and the relationship
                of the parties shall be construed according to the laws of the
                State of Delaware, without giving consideration to principals of
                conflict of law.{" "}
              </p>
              <p className="mb-2">
                20.2 The Customer and Company (a) irrevocably consent to the
                jurisdiction of the United States District Court and the State
                courts of Delaware; (b) agree that any action relating to the
                services performed by Company, shall only be brought in said
                courts; (c) consent to the exercise of in personam jurisdiction
                by said courts over it, and (d) further agree that any action to
                enforce a judgment may be instituted in any jurisdiction
              </p>
            </div>
            <div className="">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                21. UPDATES, MODIFICATIONS AND AMENDMENTS
              </p>
              <p className="mb-2">
                We reserve the sole right to update, modify, change or revise
                these Terms from time to time. The changes will not be
                retroactive, and the most current version of the Terms will
                always be on this page and will continue to govern our
                relationship with you. We advise that you check this page often,
                referring to the date of the last modification on the page. We
                will also try to notify you of any material changes which could
                be done via the email. By continuing to use our Service after
                the changes become effective, you agree to be bound by the
                revised Terms.
              </p>
            </div>
            <div className="my-4">
              <p className="black-text text-lg mb-2 font-semibold uppercase">
                22. EFFECTIVE DATE
              </p>
              <p className="mb-2">
                This Terms of Use is effective this 22nd day of June 2022.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
