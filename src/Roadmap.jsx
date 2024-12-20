import React, { useEffect } from 'react';
import './scss/Roadmap.scss';
import Window from './Window'
import questsStore from "./questsStore";

const Roadmap = (props) => {

    useEffect(() => {
        questsStore.completeQuest('roadmap')
    }, [])
    return (
        <Window type="roadmap">
            <div className='Roadmap'>
                <div className='Roadmap_header'>
                    $KNUT - Steak Baby Roadmap
                </div>
                <div className='Roadmap_phase'>
                    Year 1: "The $KNUT"
                </div>
                <div className='Roadmap_step'>
                    - From $10K MC to GG EZ Moon.
                </div>
                <div className='Roadmap_step'>

                    - Community rallies hard—memes go brrr.
                </div>
                <div className='Roadmap_step'>

                    - Zoo-Meta prep.
                </div>
                <div className='Roadmap_phase'>
                    Year 2: "MrGigaSer"
                </div>

                <div className='Roadmap_step'>
                    - Tokenomics: Degenerate but genius.
                </div>
                <div className='Roadmap_step'>
                    - Staking? Soon™.
                </div>
                <div className='Roadmap_step'>
                    - First partnerships: Zoo Gang grows.
                </div>

                <div className='Roadmap_phase'>
                    Year 3: "Steak Prep"
                </div>
                <div className='Roadmap_step'>


                    - Big Apes : $PNUT, $FRED, $MOODENG, $KNUT
                </div>
                <div className='Roadmap_step'>

                    - Everyone doing the $KNUT shuffle.
                </div>
                <div className='Roadmap_step'>

                    - **Treasury fattening up**—GG easy $5M.
                </div>

                <div className='Roadmap_phase'>
                    Year 4: "Steak Baby Era"

                </div>
                <div className='Roadmap_step'>
                    - Charity Flex: Polar bear vibes.
                </div>
                <div className='Roadmap_step'>
                    - 5M Treasury: Knut keeps printing.
                </div>
                <div className='Roadmap_step'>
                    - Community = Degens United.
                </div>
                <div className='Roadmap_phase'>
                    Year 5: "Binance or Bust"
                </div>
                <div className='Roadmap_step'>
                    - Mainstream listing hype.
                </div>
                <div className='Roadmap_step'>
                    - Zoo-Meta takeover: $KNUT is king.
                </div>
                <div className='Roadmap_step'>
                    - Steak? Now.  Maybe.
                </div>
                <div className='Roadmap_header'>
                    Scaling the $KNUT Empire: Everything, but Better
                </div>
                <div className='Roadmap_step'>
                    $KNUT isn’t here to play—it’s here to dominate. Scaling isn’t just about building; it’s about outbuilding, outmemeing, and outlasting everyone else in the Web3 tundra.
                </div>
                <div className='Roadmap_step'>


                    We’re creating everything that already exists, but cooler, slicker, and with STEAKS. DeFi? Ours. NFTs? Done better. P2E games? Zoo-level wild. Think social platforms, staking protocols, charitable initiatives, DEXs, multi-chain integrations, and utility tools**—all with the **KNUT flair and memecoin vibe.
                </div>
                <div className='Roadmap_step'>
                    Our secret sauce? We combine relentless community power, battle-tested tokenomics, and a zero-prisoner mentality to crush competitors. We don’t just follow trends; we take the best of what’s out there, make it unstoppable, and slap a polar bear logo on it.
                </div>
                <div className='Roadmap_phase'>
                    We’ll scale with:
                </div>
                <div className='Roadmap_step'>
                    - Cross-chain dominance: From Ethereum to Solana and beyond.
                </div>
                <div className='Roadmap_step'>
                    - NFT ecosystems: Zoo-Meta drops that actually slap.
                </div>
                <div className='Roadmap_step'>

                    - Web3 marketplaces: Degenerate shopping sprees for the community.
                </div>
                <div className='Roadmap_step'>

                    - Game-changing DeFi protocols: Staking? Steakified. Farming? Yielded.
                </div>
                <div className='Roadmap_step'>
                    - Education platforms: Because even degens need DYOR tools.
                </div>
                <div className='Roadmap_step'>
                    - Global outreach: Memes, marketing, and mainstream partnerships.
                </div>
                <div className='Roadmap_step'>
                    The world is building Web3—we’re building Web3 better. $KNUT isn’t just scaling; it’s creating an empire. We’ll claim the Arctic, Web3, and everything in between.
                </div>

                <div className='Roadmap_step'>
                    Because if they’ve built it, we’ll build it better.
                </div>
                <div className='Roadmap_step'>
                    $KNUT forever. Wagmi. Steak soon.
                </div>
                <div className='Roadmap_header'>
                    The Ultimate Guide to Cooking Steak
                </div>
                <div className='Roadmap_step'>

                    Steak is an art form, and whether you’re a grill master or a kitchen newbie, there’s a cooking method for you. Here’s a breakdown of the most popular ways to cook steak—because no matter the style, the goal is always perfection.
                </div>





                ---

                <div className="Roadmap_phase"> 1. Grilling (Classic Steakhouse Style)</div>
                <div className='Roadmap_step'>
                    Best For: Ribeye, T-bone, or Sirloin.
                </div>
                <div className='Roadmap_step'>
                    Steps:
                </div>
                <div className='Roadmap_step'>
                    1. Preheat your grill to high heat.
                </div>
                <div className='Roadmap_step'>
                    2. Season your steak with salt, pepper, and olive oil.
                </div>
                <div className='Roadmap_step'>
                    3. Sear for 3-5 minutes per side for medium-rare (internal temp: 130°F/54°C).
                </div>
                <div className='Roadmap_step'>
                    4. Rest for 5-10 minutes before serving.
                </div>
                <div className='Roadmap_step'>
                    Pro Tip: For grill marks, rotate your steak 45° halfway through searing each side.
                </div>
                <div className="Roadmap_phase"> 2. Pan-Seared (Quick and Flavorful)</div>
                <div className='Roadmap_step'>
                    Best For: Filet Mignon, Strip Steak.
                </div>
                <div className='Roadmap_step'>
                    Steps:
                </div>
                <div className='Roadmap_step'>
                    1. Heat a heavy skillet (cast iron is ideal) until smoking hot.
                </div>
                <div className='Roadmap_step'>
                    2. Add oil and lay your seasoned steak in the pan.
                </div>
                <div className='Roadmap_step'>
                    3. Sear for 3-4 minutes per side. Add butter, garlic, and herbs (like rosemary) for a butter-basted finish.
                </div>
                <div className='Roadmap_step'>
                    4. Rest before serving.
                </div>
                <div className='Roadmap_step'>
                    Pro Tip: Spoon melted butter over the steak while it cooks for extra flavor.
                </div>

                ---

                <div className="Roadmap_phase"> 3. Sous Vide (Precision Cooking)</div>
                <div className='Roadmap_step'>
                    Best For: All cuts, especially thick ones.
                </div>
                <div className='Roadmap_step'>
                    Steps:
                </div>
                <div className='Roadmap_step'>
                    1. Season your steak and seal it in a vacuum bag.
                </div>
                <div className='Roadmap_step'>
                    2. Cook in a sous vide bath at your desired temperature (e.g., 129°F/54°C for medium-rare) for 1-3 hours.
                </div>
                <div className='Roadmap_step'>
                    3. Finish with a hot sear in a skillet or grill for a crispy crust.
                </div>
                <div className='Roadmap_step'>
                    Pro Tip: Sous vide ensures perfect doneness, so focus on the sear for the ultimate steak.
                </div>

                ---

                <div className="Roadmap_phase"> 4. Broiling (Oven Magic)</div>
                <div className='Roadmap_step'>
                    Best For: Flank Steak, Skirt Steak.
                </div>
                <div className='Roadmap_step'>
                    STEPS:
                </div>
                <div className='Roadmap_step'>
                    1. Preheat your oven’s broiler and place the steak on a rack over a baking sheet.
                </div>
                <div className='Roadmap_step'>
                    2. Broil 3-4 inches from the heat source for 4-6 minutes per side.
                </div>
                <div className='Roadmap_step'>
                    3. Let it rest before slicing.
                </div>
                <div className='Roadmap_step'>
                    Pro Tip: Use a marinade to tenderize tougher cuts before broiling.
                </div>

                ---

                <div className="Roadmap_phase"> 5. Reverse Searing (Best for Thick Cuts)</div>
                <div className='Roadmap_step'>
                    Best For: Tomahawk, Porterhouse.
                </div>
                <div className='Roadmap_step'>
                    Steps:
                </div>
                <div className='Roadmap_step'>
                    1. Preheat your oven to 275°F (135°C).
                </div>
                <div className='Roadmap_step'>
                    2. Slowly cook the steak on a wire rack until it reaches 10°F below your desired doneness.
                </div>
                <div className='Roadmap_step'>
                    3. Sear in a hot skillet for 1-2 minutes per side.
                </div>
                <div className='Roadmap_step'>
                    Pro Tip: This method gives you an even cook with a perfect crust.
                </div>

                ---

                <div className="Roadmap_phase"> 6. Smoking (For the BBQ Enthusiast)</div>
                <div className='Roadmap_step'>
                    Best For: Brisket-style cuts or any fatty steak.
                </div>
                <div className='Roadmap_step'>
                    Steps:
                </div>
                <div className='Roadmap_step'>
                    1. Preheat your smoker to 225°F (107°C).
                </div>
                <div className='Roadmap_step'>
                    2. Season your steak generously and smoke for 30-60 minutes.
                </div>
                <div className='Roadmap_step'>
                    3. Finish with a high-heat sear if needed.
                </div>
                <div className='Roadmap_step'>
                    Pro Tip: Add wood chips (like hickory or mesquite) for smoky flavor.
                </div>

                ---

                <div className="Roadmap_phase"> 7. Steak Tartare (No Cooking Required!)</div>
                <div className='Roadmap_step'>
                    Best For: High-quality, super fresh cuts (e.g., tenderloin).
                </div>
                <div className='Roadmap_step'>
                    Steps:
                </div>
                <div className='Roadmap_step'>
                    1. Dice the steak finely.
                </div>
                <div className='Roadmap_step'>
                    2. Mix with raw egg yolk, capers, mustard, and seasonings.
                </div>
                <div className='Roadmap_step'>
                    3. Serve cold with toast or crackers.
                </div>
                <div className='Roadmap_step'>
                    Pro Tip: Always use steak-grade meat and keep it chilled.
                </div>

                ---

                <div className="Roadmap_phase"> Steak Doneness Temperatures:</div>
                <div className='Roadmap_step'>
                    - Rare: 120-125°F (49-52°C)
                </div>
                <div className='Roadmap_step'>
                    - Medium-Rare: 130-135°F (54-57°C)
                </div>
                <div className='Roadmap_step'>
                    - Medium: 140-145°F (60-63°C)
                </div>
                <div className='Roadmap_step'>
                    - Medium-Well: 150-155°F (65-68°C)
                </div>
                <div className='Roadmap_step'>
                    - Well-Done: 160°F+ (71°C+)
                </div>

                <div className='Roadmap_phase'>
                    No matter how you cook it, rest your steak for 5-10 minutes before slicing—it locks in those juices and ensures maximum flavor. Now grab your favorite cut, fire up your tools, and get cooking! Steak baby, soon!
                </div>
                <div className='Roadmap_step'>
                    Thx 4 reading
                </div>

                <div className='Roadmap_step'>
                    Wp rip xx

                </div>


            </div>
        </Window>
    )
}

export default Roadmap