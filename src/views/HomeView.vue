<template>
  <div class="home">
    <div class="container">
      <div class="topPlayer">
        <div class="topPlayer__name">
          {{ getPlayer.name }}
          <div class="topPlayer__Coins">
            {{ getPlayer.currentCoinsCounter }}
            <img class="topPlayer__img" src="../assets/coin.png" alt="">
          </div>
        </div>
      </div>
      <div class="questionBar">
        <div class="questionBar__cross">
        </div>
        <div class="questionBar__center">
          <div class="questionBar__heading">
            Choose the right answer
          </div>
          <div class="questionBar__question">
            {{ currentQuestion.question }}
          </div>
        </div>
        <div class="questionBar__bulb" @click="openHint()">
        </div>
      </div>
      <div class="cross"></div>

      <div class="questionImage">
        <img class="questionImage__img" :src="currentQuestion.image" alt="">
      </div>

    </div>
    <div class="answerBar">
      <div class="answerBar__btn">
        <input type="radio" id="answer01" :value="1" v-model="currentAnswer" />
        <label for="answer01">A</label>
      </div>

      <div class="answerBar__btn">
        <input type="radio" id="answer02" :value="2" v-model="currentAnswer" />
        <label for="answer02">B</label>
      </div>
      <div class="answerBar__btn">
        <input type="radio" id="answer03" :value="3" v-model="currentAnswer" />
        <label for="answer03">C</label>
      </div>
      <div class="answerBar__checkbtn" @click="checkAnswer()">
        Check
      </div>
    </div>
    <div class="modal" id="modalPopup" @click="closePopup()">
      <span class="modal__answer">{{ answerForModal }}</span>
      <span class=" modal__closeBtn" @click="closePopup()">×</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      currentAnswer: null,
      answerForModal: "",
      currentQuestuonCounter: 1,

      question: {
        id: 1,
        question: 'Which shape shows thirds?',
        answer: 1,
      },
    }
  },
  computed: {
    ...mapGetters([
      'getPlayer', 'getQuestions',
    ]),
    currentQuestion() {
      return this.getQuestions[this.currentQuestuonCounter - 1];
    }
  },
  methods: {
    ...mapMutations(['UpdatePlayerStatus']),
    checkAnswer() {
      if (!this.modalOpened && this.currentAnswer && (this.currentQuestuonCounter <= Object.values(this.getQuestions).length)) {
        // let json = JSON.stringify(this.getQuestions);
        // console.log(json);
        this.$store.dispatch('loadData')
        if (this.currentAnswer == this.currentQuestion.answer) {
          this.answerForModal = "Ответ верный"
          this.UpdatePlayerStatus({ id: this.question.id, answer: true })
          document.getElementById("modalPopup").style.display = "block";
          this.getPlayer.currentCoinsCounter += 100;
        } else {
          this.answerForModal = "Ответ не верный"
          this.UpdatePlayerStatus({ id: this.question.id, answer: false })
          document.getElementById("modalPopup").style.display = "block";
          this.getPlayer.currentCoinsCounter -= 100;

        }
        this.currentAnswer = null;
        if (this.currentQuestuonCounter < Object.values(this.getQuestions).length) {
        this.currentQuestuonCounter += 1;
        }
        setTimeout(() => {
          this.closePopup();
        }, 1000);
        // console.log(this.getPlayer);
      }
    },
    openHint() {
      this.answerForModal = "правильный ответ: " + this.currentQuestion.answer;
      document.getElementById("modalPopup").style.display = "block";
      setTimeout(() => {
        this.closePopup();
      }, 2000);
    },

    closePopup() {
      document.getElementById("modalPopup").style.display = "none";
    },
  },
}
</script>

<style lang="scss">
.home {
  position: relative;
}

.container {
  padding-top: 7vh;
  width: 80vw;
  height: 100vh;
  margin: 0 auto;
  background: repeating-linear-gradient(to right,
      #ffe1e1 0 5vw,
      white 5vw 7vw,
    );
  position: relative;

  @media screen and (max-width: 768px) {
    width: 100vw;
  }

}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 40vw;
  height: 20vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: rgba(252, 251, 251, 0.95);
  border: #DCDCDC solid 1px;
  border-radius: 10px;


  &__closeBtn {
    position: absolute;
    top: 2vh;
    right: 2vw;
    font-family: Roboto;
    font-size: 30px;
    color: rgb(175, 174, 174);
    cursor: pointer;
    transform: scale(2);
    transition: transform 0.3s;
  }

  &__closeBtn:hover {
    transform: scale(2.5);
  }

  &__answer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 700;
    color: #414141;
  }
}

.topPlayer {
  display: flex;
  font-size: 20px;
  justify-content: end;

  &__name {
    display: flex;
    flex-direction: column;
  }

  &__Coins {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &__img {
    width: 20px;
    height: 20px;
    margin-left: 0.3vw;
  }
}

.questionBar {
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-top: 7vh;

  &__center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__heading {
    font-size: 20px;
    margin-bottom: 25px;
  }

  &__question {
    font-size: 30px;
    text-align: center;
  }

  &__cross {
    width: 30px;
    height: 30px;
    background-color: rgba(220, 220, 220, 0.5);
    border-radius: 10%;
    background-image: url(../assets/close_btn.png);
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-box-shadow: 0px 5px 0px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 0px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 0px 0px rgba(34, 60, 80, 0.2);
  }

  &__bulb {
    width: 30px;
    height: 30px;
    background-color: rgba(220, 220, 220, 0.5);
    border-radius: 10%;
    background-image: url(../assets/bulb.png);
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-box-shadow: 0px 5px 0px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 0px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 0px 0px rgba(34, 60, 80, 0.2);
  }
}

.questionImage {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;

  &__img {
    max-width: 60vw;
    max-height: 40vw;

    @media screen and (max-width: 768px) {
      max-width: 100vw;
      max-height: 60vw;
    }
  }
}

.answerBar {
  display: grid;
  width: 100%;
  grid-template-columns: auto auto auto 10vw;
  gap: 2vw;
  position: fixed;
  top: 90vh;
  background-color: rgba(220, 220, 220, 0.5);
  padding: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto auto 20vw;
  }

  &__btn label {
    display: block;
    cursor: pointer;
    padding: 1vh;
    background-color: #DCDCDC;
    border-radius: 16px;
    text-align: center;
    font-size: 20px;
    -webkit-box-shadow: 0px 5px 0px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 0px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 0px 0px rgba(34, 60, 80, 0.2);
  }

  &__btn label:hover {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }


  &__btn input[type="radio"] {
    display: none;
  }

  &__btn input[type="radio"]:checked+label {
    background-color: rgb(184, 183, 183);
  }

  &__checkbtn {
    display: block;
    cursor: pointer;
    padding: 1vh;
    background-color: #DCDCDC;
    border-radius: 16px;
    text-align: center;
    font-size: 20px;
    -webkit-box-shadow: 0px 5px 0px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 0px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 0px 0px rgba(34, 60, 80, 0.2);
  }

  &__checkbtn:hover {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
}
</style>
