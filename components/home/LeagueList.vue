<template>
  <div class="leagues">
    <div
      v-for="(league, leagues_index) in leagues"
      :key="leagues_index"
      class="league-group"
    >
      <p class="date">{{ league.date }}</p>
      <template v-for="(item, data_index) in league.gameDetail">
        <table :key="data_index" class="time-group formobileonly">
          <thead>
            <tr>
              <td class="nobk"></td>
              <td class="nobk"></td>
              <td colspan="2" class="nobk">
                <div
                  v-if="item.expiryDateTime"
                  class="time-remain"
                  :class="item.expiryDateTime"
                >
                  <client-only>
                    <timer-second-half
                      :key="`page-${data_index}`"
                      :secondhalfendtime="item.expiryDateTime"
                    ></timer-second-half>
                  </client-only>
                  <!-- <span>Time Remaining to Enter Pick: {{ (hours % 24 < 10) ? '0' + hours % 24 : hours % 24 }}:{{ (minutes % 60 < 10) ? '0' + minutes % 60 : minutes % 60 }}:{{ (seconds % 60 < 10) ? '0' + seconds % 60 : seconds % 60  }}</span> -->
                </div>
              </td>
            </tr>
            <tr>
              <th class="time">{{ item.gameTime }}</th>
              <th class="spread">SPREAD</th>
              <th class="moneyLine">MONEYLINE</th>
              <th class="total">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="time nopointer">
                {{ item.away_team_name }}
                <div
                  v-if="item.isPitcher == true"
                  class="pitcher"
                  @click="pitcherModal(item)"
                >
                  (<span>p</span>)
                </div>
              </td>
              <td
                title="SPREAD"
                class="spread"
                :class="{ nopointer: item.ASL === '-' }"
                @click="checkLineType(item, 'ASL')"
              >
                {{ item.ASL }}
              </td>
              <td
                title="MONEYLINE"
                class="moneyLine"
                :class="{ nopointer: item.AML === '-' }"
                @click="checkLineType(item, 'AML')"
              >
                {{ item.AML }}
              </td>
              <td
                title="TOTAL"
                class="total"
                :class="{ nopointer: item.ATM === '-' }"
                @click="checkLineType(item, 'ATM')"
              >
                <div class="text-with-arrow">
                  <div class="inset">
                    <span v-if="item.ATM !== '-'"
                      ><img
                        src="https://cdn-icons-png.flaticon.com/512/130/130906.png"
                        alt="arrow"
                    /></span>
                    <p>{{ item.ATM }}</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="time nopointer">
                {{ item.home_team_name }}
              </td>
              <td
                title="SPREAD"
                class="spread"
                :class="{ nopointer: item.HSL === '-' }"
                @click="checkLineType(item, 'HSL')"
              >
                {{ item.HSL }}
              </td>
              <td
                title="MONEYLINE"
                class="moneyLine"
                :class="{ nopointer: item.HML === '-' }"
                @click="checkLineType(item, 'HML')"
              >
                {{ item.HML }}
              </td>
              <td
                title="TOTAL"
                class="total"
                :class="{ nopointer: item.HTM === '-' }"
              >
                <div
                  class="text-with-arrow"
                  @click="checkLineType(item, 'HTM')"
                >
                  <div class="inset">
                    <span v-if="item.HTM !== '-'"
                      ><img
                        src="https://cdn-icons-png.flaticon.com/512/656/656979.png"
                        alt="arrow"
                    /></span>
                    <p>{{ item.HTM }}</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <MobileBanner
          :key="`banner-${data_index}`"
          :index="(data_index = data_index + 1)"
        />
      </template>
      <!-- sportbook-widget -->
      <div class="sportbook-listing">
        <div class="title-list">Best Bonuses</div>
        <div
          v-for="bonus in bonuses"
          :key="`listing-bonus-${bonus.id}`"
          class="sportlist"
        >
          <div class="leftbook">
            <div class="imgpart" v-show="bonus.image">
              <img :src="bonus.image" alt="Image" />
            </div>
            <div class="contpart">
              <span class="subhed">{{ bonus.title }}</span>
              <p class="subcont">
                {{ bonus.description }}
              </p>
            </div>
          </div>
          <div class="rightbook">
            <div class="offerbtn">
              <a :href="bonus.button1Link">
                <span class="codepromo">{{ bonus.button1Text }}</span>
                <span class="codetext">Promo Code</span>
              </a>
              <a :href="bonus.button2Link" target="_blank" class="claimoffer">{{
                bonus.button2Text
              }}</a>
            </div>
          </div>
        </div>
        <div v-if="!bonuses.length">
          <div v-if="!bonusLoaded" class="notfound">
            <v-progress-circular
              color="primary"
              indeterminate
              :size="55"
              :width="8"
            ></v-progress-circular>
          </div>
          <div v-else class="no-bonus">No Bonuses Found</div>
        </div>
      </div>
      <!-- end-sportbook -->

      <!-- native-ad -->
      <!-- <img src="@/assets/image/native.png" alt="native" class="nativebanner" /> -->
      <div v-if="$auth.loggedIn" class="show_on_login">
        <div
          v-for="data in bannerSingleObj"
          :key="data.category"
          class="banner_parent"
        >
          <div v-for="item in data.list" :key="item?.id" class="banner_child">
            <div class="native_banner" v-html="item?.content"></div>
          </div>
        </div>
      </div>
      <!-- end-native-ad -->
    </div>
    <div v-if="!isLoading && leagues.length === 0">
      <p class="notification">No games are available.</p>
    </div>
    <div v-else-if="isLoading" class="notfound">
      <v-progress-circular
        color="primary"
        indeterminate
        :size="55"
        :width="8"
      ></v-progress-circular>
    </div>
    <div class="white-content" v-if="$route.params.league">
      <h1 v-html="title"></h1>
      <p v-html="content"></p>
    </div>
    <div class="white-content" v-else>
      <h1>
        Expert Sports Picks and Predictions: How to Make the Most Out of Your
        Betting Experience
      </h1>
      <p>
        Thanks for visiting my sports picks and predictions website! Looking to
        win by making sports picks? If so, you’ve come to the right place! We
        offer all the information you need, including
        <a href="/consensus-picks">consensus picks</a> and
        <a href="/computer-picks"> computer picks</a>, to help you start making
        money betting on sports today - free, whether you're searching for
        today's predictions against the spread or the odds on your favorite
        team. We allow you to make free sports picks and predictions, so you can
        maximize your results and profits. Use our impressive free sports
        betting system to help you improve your sports betting strategy.
      </p>
      <br />
      <h2>How to make successful sports bets</h2>
      <p>
        <b>Make a plan and stick to it:</b> A budget for your betting activities
        is essential. This will assist you in avoiding losing money and
        financial difficulties.
      </p>
      <p>
        <b>Compare odds:</b>This can help to find the most value for your bet.
        Since various sportsbooks provide different odds for the same game, it's
        crucial to compare odds to find the best value.
      </p>
      <p>
        <b>Manage your emotions:</b> When placing a sports wager, it's easy to
        let your feelings run wild, but it's crucial to maintain your sense of
        reason and objectivity. Refrain from hasty wagering and stick to your
        plan.
      </p>
      <p>
        <b>Do your homework:</b> Learn more about the sport and the teams you're
        betting on so that you can make more intelligent judgments. Spend time
        researching and studying the teams and players, and keep up with the
        most recent news and trends in the sport.
      </p>
      <p>
        In the end,
        <a href="/bet/are-free-sports-picks-better-than-premium-picks/"
          >premium sports picks</a
        >
        and predictions may be a useful tool for gamblers wanting to make better
        <b>betting picks</b> and raise their chances of placing a winning wager.
      </p>
      <h2>Knowing the various sports bets available</h2>
      <p>
        Betting on sports has become more common among both serious followers
        and casual viewers. The variety of sports wagers available might be
        confusing to newbies. In this piece, we'll give you a rundown of the
        several sports betting options available, detailing the most common and
        explaining how they function.
      </p>
      <h4>1. Moneyline Bets</h4>
      <p>
        Moneyline bets are the most basic type of sports wager. Moneyline sports
        bet predictions are placed on who you think will win the game outright.
        In other words, all you're doing is picking a winner. Moneyline wagers
        are frequent in sports including football, basketball, and baseball.
      </p>
      <h4>2. Second, a spread bet</h4>
      <P
        >Point spreads are the most popular type of wager in sports betting. The
        point spread allows bettors to wager on the winning margin of a team. If
        the point spread for a football game is -6.5, the favored team must win
        by at least seven points.
      </P>
      <h4>3. Third, the Over/Under wager</h4>
      <p>
        Total bets, often known as over/under wagers, are placed on the combined
        tally of a game's points or goals. You may wager on whether the actual
        number of points scored will be above or below the total set by the
        bookmaker.
      </p>
      <h4>4. Futures wagering</h4>
      <p>
        Futures wagers are long-term bets on future outcomes, such as a team's
        regular-season record or the winner of a championship. These wagers are
        placed months in advance of the event and, if successful, may provide
        large winnings.
      </p>
      <h4>5. Prop Bets</h4>
      <p>
        Prop bets, also known as proposition bets, are wagers on certain
        game-related outcomes, such as the first team to score or the number of
        passing yards for a quarterback. These wagers can provide an
        entertaining option to wager on certain game performances.
      </p>
      <p>
        Successful sports betting requires an understanding of the various
        sports bet types. Before making a wager, it's critical to understand the
        sort of wager you're making and how it operates. You can improve your
        chances of placing wise and profitable bets by taking the time to
        educate yourself.
      </p>
      <br />
      <h2>Tips for Increasing your sports picks (ATS) profits</h2>
      <p>
        Sports betting is an exciting hobby that, if done right, can also be
        highly rewarding. Possessing a sound plan for optimizing your revenues
        is one of the keys to success. In this section, we're going to offer
        some expert tips and strategies for maximizing the profits from your
        sports betting.
      </p>
      <h4>1. Play the underdogs</h4>
      <p>
        Because underdogs often have better odds, betting on them can be
        profitable. However, it's crucial to do your homework and choose
        underdogs with a decent possibility of winning. Look for teams that have
        been winning lately but that the bookies may be underestimating.
      </p>
      <h4>2. Utilize a cash management system</h4>
      <p>
        Any sports bettor who wants to be successful has to manage their
        bankroll. Establish a spending plan for your gambling endeavors, and
        never risk more money than you can afford to lose. The Kelly Criterion
        is a well-liked tactic that assists you in choosing the best wager size
        depending on your bankroll.
      </p>
      <h4>3. Utilize incentives and promotions</h4>
      <p>
        To entice new clients or reward devoted ones, several sportsbooks
        provide incentives and promos. Utilize these deals to increase your
        earnings. To make sure you understand the criteria and limitations, read
        the terms and conditions carefully at all times.
      </p>
      <h4>4. Observe the Pros</h4>
      <p>
        Sign-up for multiple free sports pick services, track the success or
        failure of each free pick. Seek
        <a href="/bet/who-is-the-best-sports-handicapper/"
          >knowledgeable handicappers </a
        >or sports services with a solid reputation and a track record of
        success.
      </p>
      <h4>5. Place Multiple Sports Bets</h4>
      <p>
        Spreading your risk and improving your chances of success by placing
        wagers on a variety of sports. Be on the lookout for good betting
        opportunities and be ready to bet quickly, as the lines can change
        quickly.
      </p>
      <p>
        In conclusion, there are several methods and pieces of advice that may
        help you increase the profits you make from sports betting. Sports
        betting should, however, be done properly since it is not a guaranteed
        source of money. You may use these tactics as a reference to make wise
        and profitable betting choices.
      </p>
      <br />
      <h2>Guidelines for ethical sports betting</h2>
      <p>
        It's important to remember that moral gambling is critical to enjoying
        the game without going bankrupt while betting on sports, which is a
        fantastic way to add a little extra excitement to your favorite sports.
        Some guidelines for responsible sports betting are provided here.
      </p>
      <p>
        <b>1. Set a betting budget before you start betting:</b> Don't become
        broke because of gambling; decide in advance how much you can afford to
        lose. Remember that gambling is meant as a kind of amusement, not a
        means to an end in and of itself.
      </p>
      <p>
        <b>2. Conduct Research:</b> When it comes to sports betting, knowledge
        is power, therefore, conducting research may assist you in making smart
        bets. Spend some time researching the teams or individuals you want to
        wager on, taking into account things like recent performance, injuries,
        and head-to-head records.
      </p>
      <p>
        <b>3. Shop Around for the Best Odds:</b> Sportsbooks can provide varying
        odds for the same games, so it's crucial to compare prices to maximize
        the value of your bet. You may increase your chances of winning by
        comparing the odds offered by several sportsbooks.
      </p>
      <p>
        <b>4. Bet Responsibly:</b> It's important to keep in mind that gambling
        should be enjoyable and amusing rather than a means of escaping issues
        or relieving stress. Don't wager more than you can afford to lose, and
        stay away from trying to make up lost money by making additional bets.
      </p>
      <p>
        <b>5. Don't Let Emotions Drive Your Betting:</b> When placing a sports
        wager, it's easy to let your emotions get the better of you, but it's
        crucial to maintain your sense of reason and objectivity. Stick to your
        study and betting plan instead of making bets on your favorite team or
        player.
      </p>
      <p>
        <b>6. Set Limits for Yourself and Take Pauses:</b> It's crucial to take
        pauses from betting. Take a break from betting and get assistance if
        required if you see that you are becoming too emotionally connected to
        it or that it is becoming a problem.
      </p>
      <p>
        You can maximize your sports betting experience by establishing a
        budget, doing your homework, looking for the best odds, betting
        responsibly, avoiding emotional choices, and taking pauses. Sports
        betting should be enjoyable; therefore, exercise responsible gambling
        when betting on sports.
      </p>
      <br />
      <h2>Common questions and answers regarding sports picks and wagering</h2>
      <p>
        You undoubtedly have a lot of questions about how everything works if
        you're new to sports betting or want to enhance your abilities. We'll
        address some of the most prevalent queries concerning sports choices and
        wagering in this post.
      </p>
      <h4>1. What do sports picks mean?</h4>
      <p>
        Sports selections are forecasts of a sports event's results made by
        professionals and handicappers. You may use these recommendations to
        guide your well-informed wagering choices.
      </p>
      <h4>2. How can I locate trustworthy sports picks?</h4>
      <p>
        Sports picks and <b>free sports picks </b> are available on a wide
        variety of websites and services, but it's crucial to locate a
        trustworthy and dependable source. Look for products and services that
        have a proven track record of accomplishment and excellent client
        ratings.
      </p>
      <h4>
        3. What distinguishes a moneyline wager from a point spread wager?
      </h4>
      <p>
        When you wager on a team to win by a certain number of points or not
        lose by more than a specific number of points, you are placing a point
        spread bet. When you wager on a team to win outright, regardless of the
        point disparity, you are placing a moneyline wager.
      </p>
      <h4>4. Describe the parlay wager</h4>
      <p>
        When you mix two or more separate wagers into one stake, it's called a
        parlay. A parlay wager requires that each individual wager be successful
        in order to win.
      </p>
      <h4>5. How can I control my cash flow?</h4>
      <p>
        Excellent financial management abilities are essential for an effective
        sports bettor's career. This means establishing and sticking to a
        gambling allowance. Never make a wager that you cannot afford to lose.
      </p>
      <h4>6. Can I place sports bets online?</h4>
      <p>
        Yes, there are currently a lot of sportsbooks that allow internet
        betting. Only use reputable and legitimate bookies to keep your
        information about yourself and your finances protected.
      </p>
      <h4>7. In what states is sports betting legal?</h4>
      <p>
        Not all countries or states allow wagering on sports. Before making any
        bets, it's critical to investigate the rules in your region.
      </p>
      <p>
        All things considered, placing a wager on sports may be enjoyable and
        even lucrative, but it's crucial to do your homework, keep an eye on
        your wallet, and only utilize reliable sites for sports choices and
        betting. Before making any wagers, don't be afraid to ask experts any
        further questions or do more research.
      </p>
      <br />
      <h2>What types of free sports picks do you offer your members?</h2>
      <h4>
        We offer (ATS) against the spread, moneyline & total picks, including 1
        quarter and 1st period, 1st half and 2nd half free picks
      </h4>
      <p>
        <a href="/nfl/picks">NFL Picks </a>- Make free NFL picks each week in
        the NFL. (full game, 1st quarter, 1st half and 2nd half picks are
        available)
      </p>
      <p>
        <a href="/college-football/picks">College Football Picks </a>- Make
        weekly free college football picks. (full game, 1st quarter, 1st half
        and 2nd half picks are available)
      </p>
      <p>
        <a href="/xfl/picks">XFL Picks </a>- Make weekly free XFL picks. (full
        game picks are available)
      </p>
      <p>
        <a href="/usfl/picks">USFL Picks </a>- Make weekly free USFL picks.
        (full game picks are available)
      </p>
      <p>
        <a href="/cfl/picks">CFL Picks </a>- Make weekly free CFL picks. (full
        game picks are available)
      </p>
      <p>
        <a href="/nba/picks">NBA Picks </a>- Make daily free NBA picks. (full
        game, 1st quarter, 1st half and 2nd half picks are available)
      </p>
      <p>
        <a href="/nbasl/picks">NBA Summer League Picks </a>- Make daily free NBA
        summer league picks. (full game, 1st half & second half are available)
      </p>
      <p>
        <a href="/college-basketball/picks">College Basketball Picks </a>- Make
        daily free college basketball picks. (full game, 1st half & second half
        are available)
      </p>
      <p>
        <a href="/wncaab/picks">Women’s College Basketball Picks </a>- Make
        daily free women’s college basketball picks. (full game, 1st half &
        second half are available)
      </p>
      <p>
        <a href="/wnba/picks">WNBA Picks </a>- Make daily free WNBA picks. (full
        game, 1st quarter, 1st half and 2nd half picks are available)
      </p>
      <p>
        <a href="/eurobb/picks">European Basketball Picks </a>- Make daily free
        European basketball picks. (full game, 1st quarter, 1st half and 2nd
        half picks are available)
      </p>
      <p>
        <a href="/big3/picks">Big 3 Picks </a>- Make daily free Big 3 picks.
        (full game)
      </p>
      <p>
        <a href="/mlb/picks">MLB Picks </a>- Make daily free MLB picks. (full
        game, 5 inning)
      </p>
      <p>
        <a href="/nhl/picks">NHL Picks </a>- Make daily free NHL picks. (full
        game, 1st period)
      </p>
      <p>
        <a href="/soccer/picks">Soccer Picks </a>- Make daily free soccer picks.
        (full game, 1st half)
      </p>
      <br />
      <h2>When should I seek out a sports handicapper?</h2>
      <p>
        Are you sick and tired of losing your <b>sports bets</b>? Are you trying
        to improve your strategy and profits? You may need to look into a
        professional sports handicapper service or sports pick service. This may
        help you boost your win totals and, in the end, become more profitable.
      </p>
      <p>
        Sports experts base their best sports picks and forecasts on an in-depth
        study and analysis of team statistics, public consensus data, player
        performance, injury reports, and outside variables like the venue and
        many others. Experts may provide precise predictions and insights into
        the game using this information.
      </p>
      <p>
        But why are these forecasts so crucial? To begin with, they provide a
        clearer and more knowledgeable perspective on the game. You can place
        your sports bets based on speculation or incorrect ideas without
        professional analysis. You can make better selections and raise your
        chances of winning by using expert picks.
      </p>
      <p>
        Not all experts use the same criteria when making their
        <b>best sports predictions</b> and picks. Be sure the information you
        find comes from credible sources. It's important to use experts with a
        proven track record of success and reliable customer support. You should
        also think about how knowledgeable and experienced they are in the sport
        you are betting on. Can they prove their record on their site? If not,
        this can be a big red flag.
      </p>
      <p>
        When making a sports wager, you need to think about these things.
        Setting a budget, studying the odds, and keeping your cool when losses
        come are all good examples. Paying attention to these tips and applying
        expert analysis will improve your winning percentage and overall
        enjoyment of wagering on sports.
      </p>
      <br />
      <h2>Finding a trustworthy sports handicapper</h2>
      <p>
        Are you fed up with squandering your hard-earned cash on sports betting?
        Do you want to boost your winning chances and make better daily sports
        picks? If so, your search for a dependable
        <a
          href="/bet/how-expert-sports-handicappers-can-help-you-improve-your-betting-strategy/"
          >expert sports handicapper</a
        >
        may have been the answer you've been looking for.
      </p>
      <p>
        <b>1. Examine their track record:</b> Spend some time looking over a
        sports handicapper's past performances before hiring them. To determine
        whether they have a track record of offering correct forecasts and
        recommendations, look at reviews and endorsements from prior customers.
      </p>
      <p>
        <b>2. Be on the lookout for transparency:</b> A reputable sports
        handicapper should be open and honest about their tactics. Seek someone
        who is open to sharing their opinions and offering thorough
        justifications for their selections.
      </p>
      <p>
        <b>3. Avoid making irrational promises:</b> Be aware of sports
        handicappers who make irrational predictions or victory guarantees.
        Anyone who claims to be able to anticipate a game's result with 100%
        accuracy is most certainly a fraud.
      </p>
      <p>
        <b>4. Check for costs:</b> Sports handicappers may charge a fee for
        their services, so be sure to take that into account before using their
        services. Look for a vendor that offers honest and open pricing.
      </p>
      <p>
        <b>5. Select a sports handicapper who has experience in your sport:</b>
        Sports handicappers may have experience in a particular sport or league.
        Look for a bettor who specializes in the sport you want to bet on since
        they will know more about the teams and players.
      </p>
      <p>
        In the end, hiring a trustworthy <b>sports handicapping expert</b> can
        be a fantastic way to enhance your betting strategy and raise your
        chances of success. By using these suggestions, you may choose a
        dependable and knowledgeable sports handicapper that can provide precise
        picks and predictions for your preferred sports.
      </p>
      <br />
      <h2>Final Verdict</h2>
      <p>
        We hope that you have found our picks and predictions useful in your
        sports betting endeavors. Our site is committed to giving you the best
        advice possible so that you can make educated decisions that will
        increase your profits.
      </p>
      <p>
        It is essential to remember that there are no sure things in sports
        betting. Even the most precise predictions occasionally fail to hit the
        mark. Therefore, bet responsibly and never risk more than you can afford
        to lose.
      </p>
      <p>
        It's crucial to do your own research and analysis in addition to
        utilizing our sports picks and forecasts. Before making a wager, always
        take into account a variety of sources and don't depend exclusively on
        our advice. This will improve your chances of success and assist you in
        making the best choice possible.
      </p>
      <p>
        Last but not least, enjoy yourself! Don't become too focused on the
        outcomes since sports betting should be fun and thrilling. Maintain
        composure and savor the excitement of the game.
      </p>
      <p>
        We appreciate you making our
        <b>sports picks & predictions website</b> your first choice for
        professional sports betting, and we wish you the best of luck!
      </p>
    </div>

    <client-only>
      <modal class="my-custom-modal my-bet-modal" name="bet-modal">
        <div v-if="!isModalLoading" class="modal-content">
          <h1 v-if="lineOptions.length > 0" class="heading">
            Choose one of the below!
          </h1>
          <div v-if="lineOptions.length > 0" class="body">
            <div v-if="lineOptionCheck('7d')" class="item challenge">
              <a :href="`/7d/${lineData.lineType}/${lineData.lineId}/pick`">
                <img src="@/assets/image/challenge.svg" alt="challenge" />
              </a>
              <p>7 Days Challenge</p>
            </div>
            <div v-if="lineOptionCheck('3p')" class="item pick-3">
              <a
                :href="`/3p/${lineData.lineType}/${lineData.lineId}/pickprocess`"
              >
                <img src="@/assets/image/picks-3.svg" alt="picks 3" />
              </a>
              <p>Pick 3</p>
            </div>
            <div v-if="lineOptionCheck('5p')" class="item pick-5">
              <a
                :href="`/5p/${lineData.lineType}/${lineData.lineId}/pickprocess`"
              >
                <img src="@/assets/image/picks-5.svg" alt="picks 5" />
              </a>
              <p>Pick 5</p>
            </div>
            <div v-if="lineOptionCheck('mmp')" class="item race">
              <a
                :href="`/mmp/${lineData.lineType}/${lineData.lineId}/pickprocess`"
              >
                <img
                  src="@/assets/image/moneyLineMadness.svg"
                  alt="Moneyline Madness"
                />
              </a>
              <p>Moneyline Madness</p>
            </div>
          </div>
          <div v-else class="body oops_mode">
            <div class="image"><img src="@/assets/image/oops.png" /></div>
            <div class="text-data" v-html="nolineOptionsMsg"></div>
          </div>
        </div>
        <div v-if="isModalLoading" class="notfound">
          <v-progress-circular
            color="primary"
            indeterminate
            :size="55"
            :width="8"
          ></v-progress-circular>
        </div>
      </modal>
    </client-only>

    <client-only>
      <modal class="my-custom-modal project-pitcher-modal" name="pitcher-modal">
        <div
          v-if="!isPitcherModalLoading"
          class="modal-content"
          style="height: auto !important"
        >
          <div class="heading">
            <h1>Projected Pitchers</h1>
            <button @click="hideModal('pitcher-modal')">&times;</button>
          </div>
          <div class="modal-body">
            <div
              v-if="Object.keys(pitcherDetails).length > 0"
              class="league-group"
            >
              <table class="time-group formobileonly">
                <thead>
                  <tr>
                    <th>{{ pitcherDetails.awayTeam }}</th>
                    <th>{{ pitcherDetails.homeTeam }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td :title="pitcherDetails.awayTeam">
                      {{ pitcherDetails.awayPitcher }}
                    </td>
                    <td :title="pitcherDetails.homeTeam">
                      {{ pitcherDetails.homePitcher }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="body oops_mode">
              <div class="image"><img src="@/assets/image/oops.png" /></div>
              <div class="text-data" v-html="noPitcherMsg"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="hideModal('pitcher-modal')">Close</button>
          </div>
        </div>
        <div v-if="isPitcherModalLoading" class="notfound">
          <v-progress-circular
            color="primary"
            indeterminate
            :size="55"
            :width="8"
          ></v-progress-circular>
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script>
import MobileBanner from "@/components/common/MobileBanner.vue";
import TimerSecondHalf from "@/components/common/TimerSecondHalf.vue";

export default {
  name: "LeagueList",
  components: {
    MobileBanner,
    TimerSecondHalf,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ["leagues", "isLoading", "content", "title"],
  data() {
    return {
      index: 0,
      isModalLoading: true,
      lineOptions: [],
      nolineOptionsMsg: "",
      isPitcherModalLoading: true,
      pitcherDetails: {},
      noPitcherMsg: "",
      lineData: {},
      bonuses: [],
      bonusLoaded: false,
      groupByCategory: [],
      bannerSingleObj: [],
    };
  },
  computed: {
    getAllBanner() {
      return this.$store.getters["bannerModule/getAllBanner"];
    },
    bonusesWidgets() {
      return this.$store.getters["default/getWidgetListing"];
    },
  },
  async beforeMount() {
    // await this.$store.dispatch("bannerModule/apiCall");
    // this.groupByCategory = this.getAllBanner?.reduce((group, product) => {
    //   const index = group.findIndex((x) => x.category === product.category);
    //   if (index > -1) {
    //     if (group[index].list) {
    //       group[index].list.push(product);
    //     } else {
    //       group[index].list = [product];
    //     }
    //   } else {
    //     group.push({ category: product.category, list: [product] });
    //   }
    //   return group;
    // }, []);
    // this.bannerSingleObj = this.getBannerObj("Native");
  },
  mounted() {
    this.bonusLoaded = false;
    this.bonuses = this.bonusesWidgets;
    this.bonusLoaded = true;
  },
  methods: {
    getBannerObj(categoryname) {
      return this.groupByCategory?.filter(
        (res) => res.category === categoryname
      );
    },

    hideModal(key) {
      this.$modal.hide("pitcher-modal");
    },

    async checkLineType(item, type) {
      if (item[type] === "-") {
        return false;
      }
      this.nolineOptionsMsg = "";
      this.isModalLoading = true;
      this.lineOptions = [];
      const payload = {
        lineId: item.id,
        lineType: type,
      };

      if (!this.$auth.loggedIn) {
        window.location.href = "/login";
      } else {
        this.$modal.show("bet-modal");
        const response = await this.$store.dispatch(
          "picks/checkLineType",
          payload
        );

        this.isModalLoading = false;

        if (response.code === 400) {
          this.lineOptions = [];
          this.nolineOptionsMsg = response.message;
        } else if (response.code === 401) {
          alert(response.message);
          this.nolineOptionsMsg = response.message;
          window.location.reload();
        } else {
          this.lineOptions = this.$store.getters["picks/getLineOption"];
          this.lineData = response.data;
        }
      }
    },
    async pitcherModal(item) {
      this.isPitcherModalLoading = true;
      this.noPitcherMsg = "";

      const payload = {
        lineId: item.id,
      };

      this.$modal.show("pitcher-modal");
      const response = await this.$store.dispatch("picks/getPitcher", payload);

      this.isPitcherModalLoading = false;

      if (response.code === 400) {
        this.pitcherDetails = {};
        this.noPitcherMsg = response.message;
      } else {
        this.pitcherDetails = response.data;
      }
    },
    lineOptionCheck(field) {
      return this.lineOptions.includes(field);
    },
  },
};
</script>

<style lang="scss" scoped>
.banner_child {
  .native_banner {
    width: 100%;
    overflow: hidden;
    margin-bottom: 15px;
    text-align: center;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    justify-content: center;
    -webkit-justify-content: center;
  }
}
.leagues {
  margin-top: 16px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  .nopointer {
    cursor: auto;
  }
  .project-pitcher-modal {
    div {
      .modal-content {
        @media all and (max-width: 1024px) {
          padding: 0px;
        }
        .heading {
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          justify-content: space-between;
          -webkit-justify-content: space-between;
          padding: 15px 15px;
          border-bottom: 0.5px solid #e0e0e0;
          h1 {
            color: #000;
            font-size: 20px;
            font-weight: 600;
          }
          button {
            line-height: 0px;
            font-size: 30px;
            opacity: 0.5;
            font-weight: 500;
          }
        }
        .modal-body {
          padding: 15px;
          table {
            thead {
              tr {
                th {
                  width: 50%;
                  text-align: left;
                }
              }
            }
            tbody {
              tr {
                td {
                  text-align: left;
                  @media all and (max-width: 360px) {
                    text-align: left !important;
                    &::before {
                      position: relative;
                      top: 0;
                      display: block;
                      left: 0;
                      text-align: left;
                      margin-bottom: 5px;
                      font-size: 12px;
                    }
                  }
                }
              }
            }
          }
        }
        .modal-footer {
          padding: 0px 15px 15px;
          display: flex;
          display: -webkit-flex;
          justify-content: flex-end;
          -webkit-justify-content: flex-end;
          button {
            padding: 10px 15px;
            background: #6c757d;
            color: #fff;
            border-radius: 2px;
            font-size: 16px;
          }
        }
      }
    }
  }
  .league-group:last-child table.time-group:last-child {
    margin-bottom: 0 !important;
  }
  .notfound {
    font-weight: bold;
    text-align: center;
    margin-top: 10%;
    margin-bottom: 10%;
  }
  .league-group {
    .time-remain {
      font-size: 16px;
      text-align: right;
      font-weight: 500;
      margin-bottom: 12px;
      span {
        background: #fff;
        color: #fa8c28;
        padding: 6px 10px;
        display: inline-block;
        border-radius: 5px;
        border: 1px solid #fa8c28;
        text-align: center;
        margin-bottom: 8px;
      }
    }
    p.date {
      padding: 12px 0;
      margin: 0;
      text-align: center;
      font-weight: 600;
      font-size: 16px;
      text-transform: uppercase;
      color: #ffffff;
      background: #2e305c;
      border-radius: 4px;
      margin-bottom: 8px;
      @media all and (max-width: 959px) {
        font-size: 15px !important;
      }
    }
    table.time-group {
      background: #ffffff;
      border-spacing: 0;
      border-collapse: separate;
      width: 100%;
      margin-bottom: 8px;

      &.desktoponly {
        @media screen and (max-width: 767px) {
          display: none;
        }
      }
      tr th,
      tr td {
        border-right: 0.5px solid #e0e0e0;
        border-bottom: 0.5px solid #e0e0e0;
        &:first-child {
          border-left: 0.5px solid #e0e0e0;
        }
      }
      tr th {
        background: #eee;
        border-top: 0.5px solid #e0e0e0;
        text-align: left;
      }

      /* top-left border-radius */
      tr:first-child th:first-child {
        border-top-left-radius: 4px;
      }

      /* top-right border-radius */
      tr:first-child th:last-child {
        border-top-right-radius: 4px;
      }

      /* bottom-left border-radius */
      tr:last-child td:first-child {
        border-bottom-left-radius: 4px;
      }

      /* bottom-right border-radius */
      tr:last-child td:last-child {
        border-bottom-right-radius: 4px;
      }
      thead {
        font-style: normal;
        font-weight: 700;
        font-size: 10px;
        color: #000000;
        background: #f5f5f5;
        .nobk {
          background-color: white;
          border-left: 0px;
          border-right: 0px;
          .time-remain {
            margin-bottom: 0;
          }
        }
        tr th {
          padding: 7px 8px !important;
          text-align: center;
          font-size: 15px !important;

          @media screen and (max-width: 767px) {
            font-size: 15px !important;
            font-weight: 500 !important;
          }
          @media screen and (min-width: 960px) and (max-width: 1299px) {
            font-size: 15px !important;
          }
          &.time {
            text-align: left;
            padding-left: 12px;
          }
        }
      }
      tbody {
        tr {
          text-transform: uppercase;
          font-style: normal;
          font-size: 9px;
          line-height: 9px;
          cursor: pointer;
          border-bottom: #2e305c solid 2px;
          td {
            font-size: 15px;
            font-weight: 400;
            padding: 10px 8px !important;
            line-height: 16px;
            @media screen and (min-width: 960px) and (max-width: 1090px) {
              font-size: 14px !important;
            }
            @media screen and (max-width: 959px) {
              font-size: 15px !important;
            }
            @media screen and (max-width: 767px) {
              font-size: 15px !important;
              font-weight: 500 !important;
            }
            &.time {
              padding: 11px 0 11px 12px;
              color: #000000;
              .pitcher {
                display: inline-block;
                cursor: pointer;
                span {
                  color: #51c543;
                  font-weight: 700;
                }
              }
            }
            &:not(.time) {
              // font-weight: 400;
              text-align: center;
              color: #000000;
            }
            .text-with-arrow {
              display: flex;
              align-items: center;
              display: -webkit-flex;
              -webkit-align-items: center;
              .inset {
                width: 100%;
                margin: 0 auto;
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                -webkit-justify-content: center;
                align-items: center;
                -webkit-align-items: center;
                span {
                  width: 12px;
                  line-height: 0px;
                  img {
                    max-width: 100%;
                  }
                }
                p {
                  width: 100px;
                  @media screen and (min-width: 960px) and (max-width: 1090px) {
                    font-size: 14px !important;
                    width: 87px;
                  }
                  @media all and (max-width: 959px) {
                    font-size: 15px !important;
                  }
                  @media all and (max-width: 767px) {
                    width: auto;
                    margin-left: 10px;
                  }
                }
                @media all and (max-width: 767px) {
                  justify-content: flex-end;
                  -webkit-justify-content: flex-end;
                }
              }
            }
          }
          td:nth-child(1) {
            width: 40%;
            @media screen and (max-width: 767px) {
              width: 100%;
            }
          }
          td:nth-child(2),
          td:nth-child(3),
          td:nth-child(4) {
            width: 20%;
            @media screen and (max-width: 767px) {
              width: 100%;
            }
          }
        }
      }
    }
  }
  .modal-content {
    .body {
      justify-content: center;
      -webkit-justify-content: center;
      .item {
        width: 25%;
        p {
          @media all and (max-width: 959px) {
            font-size: 16px !important;
          }
        }
        @media all and (max-width: 768px) {
          width: 50%;
        }
      }
      &.oops_mode {
        font-size: 16px;
        font-weight: 500;
        color: #2e305c;
        max-width: 523px;
        flex-wrap: wrap;
        margin: 0 auto;
        -webkit-flex-wrap: wrap;
        .image {
          max-width: 60px;

          img {
            max-width: 100%;
          }
        }
        .text-data {
          margin-top: 15px;
          line-height: 35px;
          font-size: 20px;
          text-align: center;
          width: 100%;
          &::v-deep span {
            background: #fe646f;
            padding: 5px 10px;
            border-radius: 3px;
            color: #fff;
            margin: 0 5px;
          }
        }
      }
    }
    @media all and (max-width: 1024px) {
      padding: 56px;
    }
    @media all and (max-width: 767px) {
      padding: 20px;
    }
  }

  .white-content {
    background: #fff;
    border: #e0e0e0 solid thin;
    padding: 15px;
    border-radius: 8px;
    margin-top: 15px;

    h1 {
      color: #000000;
      font-style: normal;
      font-weight: 700;
      font-size: 28px;
      margin-bottom: 15px;
    }
    h2 {
      color: #000000;
      font-style: normal;
      font-weight: 700;
      margin-top: 15px;
      margin-bottom: 15px;
      font-size: 20px;
    }
    p {
      margin-bottom: 10px;
      color: #000000;
      margin-top: 10px;
      font-size: 15px !important;
      line-height: 26px !important;
    }
    ul {
      margin: 0px;
      padding: 0px;
      text-indent: 8px;

      li {
        list-style-position: inside;
        margin-bottom: 10px;
      }
    }
  }

  .sportbook-listing {
    .title-list {
      background: #ebebeb;
      color: #000;
      padding: 15px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: 600;
    }
    .sportlist {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 10px;
      border-bottom: #e0e0e0 solid thin;

      &:first-child {
        border-top: #e0e0e0 solid thin;
      }

      @media screen and (max-width: 767px) {
        flex-wrap: wrap;
      }
      @media screen and (min-width: 1025px) and (max-width: 1400px) {
        flex-wrap: wrap;
      }

      .leftbook {
        flex: 0 0 60%;
        flex-shrink: 1;
        flex-direction: row;
        display: flex;
        align-items: center;
        margin-right: 10px;

        @media screen and (max-width: 767px) {
          flex: 0 0 100%;
        }
        @media screen and (min-width: 1025px) and (max-width: 1400px) {
          flex: 0 0 100%;
        }

        .imgpart {
          width: 50px;
          min-width: 50px;
          height: 50px;
          overflow: hidden;
          border-radius: 6px;
          margin-right: 15px;

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            object-position: top center;
          }
        }

        .contpart {
          width: calc(100% - 50px);
          span.subhed {
            font-size: 14px;
            font-weight: 500;
            color: #000000;
            @media screen and (max-width: 767px) {
              font-size: 14px !important;
            }
          }
          p.subcont {
            font-size: 16px;
            font-weight: 500;
            color: #000000;

            @media screen and (max-width: 767px) {
              font-size: 14px !important;
            }
          }
        }
      }

      .rightbook {
        flex: 0 0 40%;
        flex-shrink: 1;

        @media screen and (max-width: 767px) {
          flex: 0 0 100%;
        }
        @media screen and (min-width: 1025px) and (max-width: 1400px) {
          flex: 0 0 100%;
        }

        .offerbtn {
          display: flex;
          margin-top: 15px;
          gap: 5px;

          a {
            text-decoration: none;
            flex: 0 0 50%;
            flex-shrink: 1;
            flex-direction: column;
            display: flex;
            justify-content: center;
            background: #ebebeb;
            padding: 8px 12px;
            text-align: center;
            border-radius: 5px;
            margin-right: 10px;

            .codepromo {
              color: #000;
              font-size: 15px;
              text-transform: uppercase;
              font-weight: 600;
              @media screen and (min-width: 1026px) and (max-width: 1299px) {
                font-size: 12px;
              }
            }
            .codetext {
              font-size: 10px;
              color: #000;
            }
          }

          .claimoffer {
            text-decoration: none;
            flex: 0 0 50%;
            flex-shrink: 1;
            background: #fa8c28;
            color: #ffffff;
            padding: 12px;
            font-size: 15px;
            font-weight: 600;
            border-radius: 5px;
            @media screen and (min-width: 1026px) and (max-width: 1299px) {
              font-size: 12px;
            }
          }
        }
      }
    }
    .no-bonus {
      text-align: center;
      padding-bottom: 15px;
      padding-top: 15px;
    }

    .sportlist + .sportlist {
      border-bottom: #e0e0e0 solid thin;
    }
  }
  .nativebanner {
    width: 100%;
    margin-bottom: 10px;
  }
}

// formobileonly table
@media screen and (max-width: 767px) {
  table.time-group.formobileonly {
    display: block;
    margin-bottom: 0px !important;

    thead {
      display: none;
    }
    tbody {
      display: block;
      width: 100%;

      tr {
        display: block;
        width: 100%;

        td {
          display: block;
          width: 100%;
          text-align: right !important;
          position: relative;
          border: #e0e0e0 solid thin;
          border-bottom: none;
          font-size: 15px !important;
          padding: 14px !important;

          &:first-child {
            background: #f1f1f1;
          }

          &::before {
            content: " " attr(title) "";
            position: absolute;
            left: 11px;
            font-size: 15px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
