<script lang="ts">
  import type { FormEventHandler } from "../intefaces";
  import type { IRatesData } from "../intefaces";

  let selectData: string[] = [];
  let selectValues: IRatesData;

  // установить значения по умолчанию для валют
  let selectedFirstRate: string  = "USD";
  let selectedSecondRate: string = "RUB";

  // установить значения по умолчанию для инпутов
  let firstRateInput: number = 1
  let secondRateInput: number;

  // IIFE для мнгновенного вызова функции с fetch запросом
  async function getRatesData() {
    try {
      await fetch("https://open.er-api.com/v6/latest/USD")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          selectData = Object.keys(data.rates);
          selectValues = data.rates;
        });
    } catch (error) {
      console.log(error);
    } finally {
      calculate();
    }
  };
  
  getRatesData();

  function calculate(inputName?: string) {
    if(!inputName){
      secondRateInput = selectValues[selectedSecondRate] / selectValues[selectedFirstRate] * firstRateInput;
      secondRateInput = +secondRateInput.toFixed(4);
    }

    if(inputName === 'first-input'){
      secondRateInput = selectValues[selectedSecondRate] / selectValues[selectedFirstRate] * firstRateInput;
      secondRateInput = +secondRateInput.toFixed(4);
    }

    if(inputName === 'second-input'){
      let one = selectValues[selectedSecondRate] / selectValues[selectedFirstRate];
      if(one){
        firstRateInput = secondRateInput / one;
      } else {
        firstRateInput = selectValues[selectedSecondRate] / selectValues[selectedFirstRate] * secondRateInput;
      }
      firstRateInput = +firstRateInput.toFixed(4);
    }
  }

  //функция перехвата изменений в инпутах
  function handleChange(event: FormEventHandler<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if(target.name === 'first-input'){
      firstRateInput = +target.value;
      calculate(target.name);
      
    }
    if(target.name === 'second-input'){
      secondRateInput = +target.value;
      calculate(target.name);
    }
  }

  function handleSwap() {
    // в случае если пользователь нажал кнопку "to swap" - деструктурируем значения 
    [selectedFirstRate, selectedSecondRate] = [selectedSecondRate,selectedFirstRate];
    calculate();
  }
</script>

<div class="change-container">
  <div class="change-container__first">
    <select
      class="change-select"
      id="currency-one"
      bind:value={selectedFirstRate}
      on:change={() => {
        if(selectedFirstRate === selectedSecondRate){
          return alert('Внимаениe! ' + selectedFirstRate + ' уже был выбран')
        }
        calculate();
      }}
    >
      {#each selectData as select}
        <option class="change-option" value={select}>
          {select}
        </option>
      {/each}
    </select>
    <input class="input-rate" type="number" name="first-input" bind:value={firstRateInput} on:input={handleChange} />
  </div>
  <button class="button-swap" on:click={handleSwap}>
    <p class="button-swap__text">to swap</p>
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 3.5L8 16.5M8 3.5L3.5 7.83333M8 3.5L12.5 7.83333"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 20.5L17 7.5M17 20.5L21.5 16.1667M17 20.5L12.5 16.1667"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  <div class="change-container__second">
    <select
      class="change-select"
      id="currency-two"
      bind:value={selectedSecondRate}
      on:change={() => {
        if(selectedFirstRate === selectedSecondRate){
          return alert('Внимаениe! ' + selectedFirstRate + ' уже был выбран')
        }
        calculate();
      }}
    >
      {#each selectData as select}
        <option class="change-option" value={select}>
          {select}
        </option>
      {/each}
    </select>
    <input class="input-rate" type="number" name="second-input" bind:value={secondRateInput} on:input={handleChange} />
  </div>
</div>
