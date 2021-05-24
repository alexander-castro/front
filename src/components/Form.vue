<template>
  <div class="hello">
    <h1>Bievenido a KoraApp, ingresa tus datos para verificar el riesgo de un accidente cardiovascular</h1>
    <p>
      Basado en el conjunto de datos de
      <a href="https://biolincc.nhlbi.nih.gov/studies/framcohort/" target="_blank" rel="noopener">Framingham Heart Study</a> 
      y la liberia <a href="https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html"
       target="_blank" rel="noopener">Sklearn</a>.
    </p>
    <p><i class="material-icons" style="vertical-align: bottom;font-size: 18px !important;">warning</i> Descargo de responsabilidad: aplicación creada con fines académicos, si tiene dudas de su estado de salud
      consulte a un profesional de la medicina certificado.
    </p>
    <ul class="collapsible popout" id="panel">
      <li class="active">
      <div class="collapsible-header"><i class="material-icons">account_circle</i>Tu información</div>
        <div class="collapsible-body">
          <div class="row">
            <form class="col s12" @submit.prevent>
              <div class="row">
                <ul class="collection with-header">
                  <li class="collection-header"><h5>Demográfica</h5></li>
                  <div class="input-field col s6">
                    <select v-model="user.male">
                      <option value="">Selecciona tu genero</option>
                      <option value='Male'>Hombre</option>
                      <option value='Female'>Mujer</option>
                    </select>
                    <label>Genero</label>
                  </div>
                  <div class="input-field col s6">
                    <input id="age" type="number" class="validate" v-model="user.age">
                    <label for="age">Edad</label>
                  </div>
                  <div class="input-field col s6">
                    <select v-model="user.education">
                      <option value="">Selecciona tu nivel educativo</option>
                      <option value='Some HS'>Primaria</option>
                      <option value='High School'>Secundaria</option>
                      <option value='Some college'>Tecnico</option>
                      <option value='College'>Universidad</option>
                    </select>
                    <label>Nivel educativo</label>
                  </div>
                </ul>
                <ul class="collection with-header">
                  <li class="collection-header"><h5>Comportamental</h5></li>
                  <div class="input-field col s6">
                    <p>
                      <label>
                      <input class="with-gap" name="groupSmoke" type="radio" v-model="user.currentSmoker" value="Smoker"/>
                      <span>Fumador</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input class="with-gap" name="groupSmoke" type="radio"  checked v-model="user.currentSmoker" value="Non Smoker"/>
                        <span>No fumador</span>
                      </label>
                    </p>
                  </div>
                  <div class="input-field col s6">
                    <input id="cigarrets" type="number" class="validate" v-model="user.cigsPerDay">
                    <label for="cigarrets">Cigarrillos por dia</label>
                  </div>
                </ul>
                <ul class="collection with-header">
                  <li class="collection-header"><h5>Historial medico</h5></li>
                  <div class="input-field col s6">
                    <p>
                      <label>
                      <input class="with-gap" name="groupBrain" type="radio" v-model="user.prevalentStroke" value="Yes"/>
                      <span>Hay prevalencia de evento cerebrovascular</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input class="with-gap" name="groupBrain" type="radio" checked v-model="user.prevalentStroke" value="No"/>
                        <span>No hay prevalencia de evento cerebrovascular</span>
                      </label>
                    </p>
                  </div>
                  <div class="input-field col s6">
                    <p>
                      <label>
                      <input class="with-gap" name="groupHypertension" type="radio" v-model="user.prevalentHyp" value="Yes"/>
                      <span>Hay prevalencia de hipertensión</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input class="with-gap" name="groupHypertension" type="radio" checked v-model="user.prevalentHyp" value="No"/>
                        <span>No hay prevalencia de hipertensión</span>
                      </label>
                    </p>
                  </div>
                  <div class="input-field col s6">
                    <p>
                      <label>
                      <input class="with-gap" name="groupDiabetis" type="radio" v-model="user.diabetes" value="Yes"/>
                      <span>Con antecedente de diabetes</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input class="with-gap" name="groupDiabetis" type="radio" checked v-model="user.diabetes" value="No"/>
                        <span>Sin antecedente de diabetes</span>
                      </label>
                    </p>
                  </div>
                </ul>
                <ul class="collection with-header">
                  <li class="collection-header"><h5>Estado medico actual</h5></li>
                  <div class="input-field col s6">
                    <input id="totChol" type="number" class="validate" v-model="user.totChol">
                    <label for="totChol">Colesterol total</label>
                  </div>
                  <div class="input-field col s6">
                    <input id="BMI" type="number" step="0.1" class="validate" v-model="user.BMI">
                    <label for="BMI">Indice de masa corporal</label>
                  </div>
                  <div class="input-field col s6">
                    <input id="sysBP" type="number" step="0.1" class="validate" v-model="user.sysBP">
                    <label for="sysBP">Presión arterial sistólica</label>
                  </div>
                  <div class="input-field col s6">
                    <input id="diaBP" type="number" step="0.1" class="validate" v-model="user.diaBP">
                    <label for="diaBP">Presión arterial diastólica</label>
                  </div>
                  <div class="input-field col s6">
                    <input id="heartRate" type="number" class="validate" v-model="user.heartRate">
                    <label for="heartRate">Ritmo cardiaco</label>
                  </div>
                  <div class="input-field col s6">
                    <input id="glocusa" type="number" class="validate" v-model="user.glucose">
                    <label for="glocusa">Glucosa</label>
                  </div>
                </ul>
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
          <div v-if="result.response === -1">
            <div class="card-panel blue">
              <span class="valign-wrapper" style="color:white">
                <img class="responsive-img" style="max-width: 5% !important" src="basic.png">
                Por favor diligencia el formulario, para mostrarte tu resultado.
              </span>
            </div>
          </div>
          <div v-else-if="result.response === 0">
            <div class="card-panel green">
              <span class="valign-wrapper" style="color:white">
                <img class="responsive-img" style="max-width: 5% !important" src="good.png">
                Al parecer no tienes riesgo de tener un un accidente cardiovascular , sigue cuidandote. 
              </span>
            </div>
          </div>
          <div v-else-if="result.response === 1">
            <div class="row">
              <div class="card-panel deep-orange">
                <span class="valign-wrapper" style="color:white">
                  <img class="responsive-img" style="max-width: 5% !important" src="bad.png">
                  Al parecer tienes riesgo de tener un un accidente cardiovascular , visita a tu medico de manera urgente.
                  <div class="progress">
                    <div class="determinate red accent-4" :style="{width: result.probability * 100 + '%'}"></div>
                  </div>
                  <p class="">Probabilidad del {{ (result.probability * 100).toFixed(2) }}%.</p>
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col s4">
                <div class="card">
                <div class="card-image">
                  <img style="max-width:500px; height:350px" src="https://www.biochempharmacy.com/image/biochem/image/data/NEW/N1qI0rrZ1618042738.jpg">
                  <span class="card-title" style="background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent); width: 100%">Presión sanguinea</span>
                </div>
                <div class="card-content">
                  <p>Nuestro estudio concluyó que es muy importante cuidar la presión de la sangre, los valores normales son menos de 120
                  en sistólica y menos de 80 en diastólica. Puedes encontra más información en e siguiente enlace.</p>
                </div>
                <div class="card-action">
                  <a href="https://www.heart.org/">Heart.org</a>
                </div>
              </div>
              </div>
              <div class="col s4">
                <div class="card">
                <div class="card-image">
                  <img style="max-width:500px; height:350px" src="https://www.nutriban.com/wp-content/uploads/2019/03/diabetes-1.jpg">
                  <span class="card-title" style="background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent); width: 100%">Azucar en la sangre</span>
                </div>
                <div class="card-content">
                  <p>Adicional si tienes antecedentes de diabetes en tu familia y aun si no es asi, debes cuidar los niveles de azucar en la sangre. 
                    Considera seguir los siguientes consejos basados en mejorar tu alimentación y otros habitos.</p>
                </div>
                <div class="card-action">
                  <a href="https://www.diabetes.org.uk/guide-to-diabetes/enjoy-food/eating-with-diabetes/10-ways-to-eat-well-with-diabetes">Diabetes.ork.uk</a>
                </div>
                </div>
              </div>
              <div class="col s4">
                <div class="card">
                <div class="card-image">
                  <img style="max-width:500px; height:350px" src="https://www.grupogamma.com/wp-content/uploads/2012/02/El-tabaquismo-y-el-c%C3%A1ncer-de-pulm%C3%B3n-web.jpg">
                  <span class="card-title" style="background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent); width: 100%">Tabaquismo</span>
                </div>
                <div class="card-content">
                  <p>Por ultimo, encontramos que el tabaquismo puede influir en aumentar el riesgo de un accidente cardiovascular por ello si fumas
                      te recomendamos dejar de hacerlo, intenta probar alguna app para evitar hacerlo.</p>
                </div>
                <div class="card-action">
                  <a href="https://www.xatakandroid.com/aplicaciones-android/siete-apps-que-te-ayudaran-a-dejar-de-fumar">aplicaciones para dejar de fumar</a>
                </div>
              </div>
              </div>
            </div>
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
     return { user: {male: '', education: '', currentSmoker: 'No', prevalentStroke: 'No', prevalentHyp: 'No', diabetes: 'No'}, result: {response: -1}}
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
