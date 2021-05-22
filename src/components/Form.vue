<template>
  <div class="hello">
    <h1>Bievenido a KoraApp, ingresa tus datos para verificar el riesgo de un accidente cerebrovascular</h1>
    <p>
      Basado en el conjunto de datos de
      <a href="https://biolincc.nhlbi.nih.gov/studies/framcohort/" target="_blank" rel="noopener">Framingham Heart Study</a> 
      y el modelo LogisticRegression de <a href="https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html"
       target="_blank" rel="noopener">Scikit-learn</a>.
    </p>
    <p><i class="material-icons" style="vertical-align: bottom;font-size: 18px !important;">warning</i> Descargo de responsabilidad: aplicación creada con fines académicos, si tiene dudas de su estado de salud
      consulte a un profesional de la medicina certificado.
    </p>
    <ul class="collapsible popout" id="panel">
      <li class="active">
      <div class="collapsible-header"><i class="material-icons">account_circle</i>Tus datos</div>
        <div class="collapsible-body">
          <div class="row">
            <form class="col s12" @submit.prevent>
              <div class="row">
                <div class="input-field col s6">
                  <select v-model="user.male">
                    <option value="" selected>Selecciona tu genero</option>
                    <option value=1>Hombre</option>
                    <option value=0>Mujer</option>
                  </select>
                  <label>Genero</label>
                </div>
                <div class="input-field col s6">
                  <input id="age" type="number" class="validate" v-model="user.age">
                  <label for="age">Edad</label>
                </div>
                <div class="input-field col s6">
                  <select v-model="user.education">
                    <option value="" selected>Selecciona tu nivel educativo</option>
                    <option value=1>Primaria</option>
                    <option value=2>Secundaria</option>
                    <option value=3>Tecnico</option>
                    <option value=4>Universidad</option>
                  </select>
                  <label>Nivel educativo</label>
                </div>
                <div class="input-field col s6">
                  <p>
                    <label>
                    <input class="with-gap" name="groupSmoke" type="radio" v-model="user.smoker" v-bind:value="1"/>
                    <span>Fumador</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input class="with-gap" name="groupSmoke" type="radio"  checked v-model="user.smoker" v-bind:value="0"/>
                      <span>No fumador</span>
                    </label>
                  </p>
                </div>
                <div class="input-field col s6">
                  <input id="cigarrets" type="number" class="validate" v-model="user.cigaretts">
                  <label for="cigarrets">Cigarrillos por dia</label>
                </div>
                <div class="input-field col s6">
                  <p>
                    <label>
                    <input class="with-gap" name="groupArterial" type="radio" v-model="user.BPMED" v-bind:value="1"/>
                    <span>Si toma medicamentos para la presión arterial</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input class="with-gap" name="groupArterial" type="radio"  checked v-model="user.BPMED" v-bind:value="0"/>
                      <span>No toma medicamentos para la presión arterial</span>
                    </label>
                  </p>
                </div>
                <div class="input-field col s6">
                  <p>
                    <label>
                    <input class="with-gap" name="groupCoronary" type="radio" v-model="user.PREVCHD" v-bind:value="1"/>
                    <span>Hay prevalencia de enfermedad coronaria</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input class="with-gap" name="groupCoronary" type="radio" checked v-model="user.PREVCHD" v-bind:value="0"/>
                      <span>No hay prevalencia de enfermedad coronaria</span>
                    </label>
                  </p>
                </div>
                <div class="input-field col s6">
                  <p>
                    <label>
                    <input class="with-gap" name="groupBrain" type="radio" v-model="user.PRESTROKE" v-bind:value="1"/>
                    <span>Hay prevalencia de evento cerebrovascular</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input class="with-gap" name="groupBrain" type="radio" checked v-model="user.PRESTROKE" v-bind:value="0"/>
                      <span>No hay prevalencia de evento cerebrovascular</span>
                    </label>
                  </p>
                </div>
                <div class="input-field col s6">
                  <p>
                    <label>
                    <input class="with-gap" name="groupChest" type="radio" v-model="user.PREVAP" v-bind:value="1"/>
                    <span>Hay prevalencia angina de pecho</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input class="with-gap" name="groupChest" type="radio" checked v-model="user.PREVAP" v-bind:value="0"/>
                      <span>No hay prevalencia angina de pecho</span>
                    </label>
                  </p>
                </div>
                <div class="input-field col s6">
                  <p>
                    <label>
                    <input class="with-gap" name="groupHypertension" type="radio" v-model="user.PREVHYP" v-bind:value="1"/>
                    <span>Hay prevalencia de hipertensión</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input class="with-gap" name="groupHypertension" type="radio" checked v-model="user.PREVHYP" v-bind:value="0"/>
                      <span>No hay prevalencia de hipertensión</span>
                    </label>
                  </p>
                </div>
                <div class="input-field col s6">
                  <p>
                    <label>
                    <input class="with-gap" name="groupDiabetis" type="radio" v-model="user.DIABETES" v-bind:value="1"/>
                    <span>Con antecedente de diabetes</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input class="with-gap" name="groupDiabetis" type="radio" checked v-model="user.DIABETES" v-bind:value="0"/>
                      <span>Sin antecedente de diabetes</span>
                    </label>
                  </p>
                </div>
                <div class="input-field col s6">
                  <input id="age" type="number" class="validate" v-model="user.TOTCHOL">
                  <label for="age">Colesterol total</label>
                </div>
                <div class="input-field col s6">
                  <input id="age" type="number" class="validate" v-model="user.BMI">
                  <label for="age">Indice de masa corporal</label>
                </div>
                <div class="input-field col s6">
                  <input id="age" type="number" class="validate" v-model="user.SYSBP">
                  <label for="age">Presión arterial sistólica</label>
                </div>
                <div class="input-field col s6">
                  <input id="age" type="number" class="validate" v-model="user.DIABP">
                  <label for="age">Presión arterial diastólica</label>
                </div>
                <div class="input-field col s6">
                  <input id="age" type="number" class="validate" v-model="user.heartRate">
                  <label for="age">Ritmo cardiaco</label>
                </div>
                <div class="input-field col s6">
                  <input id="age" type="number" class="validate" v-model="user.glucose">
                  <label for="age">Glucosa</label>
                </div>
              </div>
              <div class="row center s12">
                <button class="waves-light btn" name="action" @click="sendPatientData">Analizar
                  <i class="material-icons right">send</i>
                </button>
              </div>
            </form>
          </div>
      </div>
      </li>
      <li>
        <div class="collapsible-header"><i class="material-icons">analytics</i>Tus resultados</div>
        <div class="collapsible-body">
          <div v-if="result === -1">
            Por favor diligencia el formulario, para mostrarte tu resultado.
          </div>
          <div v-else-if="result === 0">
            Al parecer no tienes riesgo de tener un un accidente cerebrovascular, sigue cuidandote. 
          </div>
          <div v-else-if="result === 1">
            Al parecer tienes riesgo de tener un un accidente cerebrovascular, visita a tu medico de manera urgente. 
          </div>
        </div>
      </li>
      <li>
        <div class="collapsible-header"><i class="material-icons">groups</i>Grupo de trabajo</div>
        <div class="collapsible-body">
          <div class="collection">
            <a class="collection-item">Andrea Elena Garcia Lopez</a>
            <a class="collection-item">Alexander Castro Romero</a>
            <a class="collection-item">Fredi Alexsander Baron Mora</a>
            <a class="collection-item">Luis Fernando Bautista Manrique</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import axios from 'axios'
import M from 'materialize-css'

export default {
  name: 'Form',
  data() {
     return { user: {BMI: 0 , BPMED: 0, DIABETES: 0, DIABP: 0, PRESTROKE: 0, PREVAP: 0, PREVCHD: 0, PREVHYP: 0,
      SYSBP: 0, TOTCHOL: 0, age: 0, cigaretts: 0, education: 1, glucose: 0, heartRate: 0, male: 0, 
      smoker: 0}, result: -1}
  },
  methods: {
    sendPatientData() {
      axios.post(this.API_BASE_URL + '/patients', {
          user: this.user
        })
        .then(response => {
          this.result = response.data.Result
          let elem = document.querySelector('.collapsible.popout');
          let instance = M.Collapsible.getInstance(elem);
          instance.open(1);
        })
        .catch(error => {
          console.log(error);
      });
    }
  }
}
</script>

<style scoped>
</style>
