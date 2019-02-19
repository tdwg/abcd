Vue.component("concept-table", function (resolve, reject) {
  setTimeout(function () {
    resolve({
    props: ["concept"],
    template:
      `
      <table class="responsive-table concept-table">
        <tbody>
          <tr>
            <td><strong>Term Name</strong></td>
            <td>{{ concept.conceptName }} </td>
          </tr>
          <tr>
            <td><strong>Label</strong></td>
            <td>{{ concept.conceptLabel }} </td>
          </tr>
          <tr>
            <td><strong>Controlled Value</strong></td>
            <td>{{ concept.conceptName }}</td>
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            <td>{{ concept.status }}</td>
          </tr>
          <tr>
            <td><strong>Term IRI</strong></td>
            <td><a v-bind:href="concept.concept" >{{ concept.concept }}</a></td>
          </tr>
          <tr>
            <td><strong>Term Version IRI</strong></td>
            <td></td>
          </tr>
          <tr>
            <td><strong>Concept Group</strong></td>
            <td>{{ concept.conceptGroupLabel }}</td>
          </tr>
          <tr v-if="!concept.typeLabels.includes('Class')">
            <td><strong>Has Domain</strong></td>
            <td>{{ concept.domainLabel }}</td>
          </tr>
          <tr v-if="!concept.typeLabels.includes('Class')">
            <td><strong>Has Range</strong></td>
            <td>{{ concept.rangeLabel }}</td>
          </tr>
          <tr>
            <td><strong>Darwin Core</strong></td>
            <td>{{ concept.darwin_core }}</td>
          </tr>
          <tr>
            <td><strong>Type</strong></td>
            <td>{{ concept.typeLabels }}</td>
          </tr>
          <tr>
            <td><strong>Comment</strong></td>
            <td>{{ concept.comment }}</td>
          </tr>
        </tbody>
      </table>
      `
    })
  }, 1000)
});

Vue.component("concept-card", {
  props: ["concept"],
  data: function () {
      return ({
        isLoaded: false
      });
  },
  watch: {
    concept: {
      handler: function(newValue){
        this.isLoaded = true;
      },
      deep: true,
      immediate: true
    }
  },
  template: 
    `
    <div class="card concept-card" v-bind:id="concept.conceptName">
      <div class="card-content">
        <div class="card-title">
          <div class="concept-label">{{ concept.conceptLabel }}</div>
          <div class="concept-type">
            <div v-if="concept.typeLabels.includes('Q81')"><span class="new badge grey" data-badge-caption="Functional Property"></span></div>
            <div v-if="concept.typeLabels.includes('Q32')"><span class="new badge red" data-badge-caption="Class"></span></div>
            <div v-if="concept.typeLabels.includes('Q14')"><span class="new badge teal darken-4" data-badge-caption="Controlled Vocabulary"></span></div>
            <div v-if="concept.typeLabels.includes('Q16')"><span class="new badge teal" data-badge-caption="Controlled Term"></span></div>
            <div v-if="concept.typeLabels.includes('Q33')"><span class="new badge blue" data-badge-caption="Object Property"></span></div>
            <div v-if="concept.typeLabels.includes('Q34')"><span class="new badge orange" data-badge-caption="Datatype Property"></span></div>
          </div>
        </div>
        <p class="concept-definition">{{ concept.conceptDescription }}</p>
        <div class="concept-info">
          <ul class="collapsible">
            <li>
              <div class="collapsible-header"><i class="material-icons">info</i>More information</div>
              <div class="collapsible-body">
                <keep-alive>
                  <concept-table v-bind:concept="concept"></concept-table>
                </keep-alive>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-action">
        <a class="waves-effect waves-light btn green" v-bind:href="'/terms/#'+concept.conceptName">2019-01-31 (Current)</a>
      </div>
    </div>
    `
});

Vue.component("concept-list", {
  props: ["concepts"],
  methods: {
    sortArrayConceptName(array){
      return _.orderBy(array, 'conceptName', 'asc');
    },
  },
  template: 
    `
    <div class="concept-list">
      <a class="waves-effect waves-green btn-flat grey-text" v-for="concept in sortArrayConceptName(concepts)" v-bind:href="'#' + concept.conceptName">{{ concept.conceptLabel }}</a>
    </div>
    `
});

new Vue({
  el: '#main-app',
  created(){
    this.debouncedConceptSearch = _.debounce(this.conceptSearch, 500);
    this.getConcepts(); 
  },
  mounted() { 
    var options = {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        "conceptLabel",
        "conceptName",
        "typeLabels"
      ]
    };

    this.fuse = new Fuse(this.concepts, options);
    this.filteredConcepts = this.concepts;
  },
  updated() {
    $('.collapsible').collapsible({accordion: false});
    $('.collapsible').collapsible('close');
    if(this.handleAnchor){
      this.handleAnchor = false;
      if(window.location.hash) {
        try{
          $('html, body').animate({
              scrollTop: $(window.location.hash.replace(".","\\.")).offset().top
          }, 500);
        }catch(error){}
      }
    }
  },
  watch: {
    conceptSearchInput: function() {
      this.debouncedConceptSearch()
    }
  },
  methods: {
    getConcepts() {
      var vinstance = this;
      /*$.getJSON('/terms/abcdTerms.json', (json) => {
        json.forEach((concept) => vinstance.concepts.push(concept));
        vinstance.handleAnchor=true;
      });*/
      $.ajax({
        type: "GET",
        url: '/terms/abcdTerms.json',
        async: false,
        success: function (json) {
          json.forEach((concept) => vinstance.concepts.push(concept));
          vinstance.handleAnchor=true;
        }
      });
    },
    getConceptGroup(conceptGroup){
      return _.sortBy(this.filteredConcepts.filter(function (concept) {
        return concept.conceptGroupLabel.includes(conceptGroup);
      }),'conceptLabel');
    },
    conceptSearch(){
      if (this.conceptSearchInput.trim() === '')
        this.filteredConcepts = this.concepts;
      else
        this.filteredConcepts = this.fuse.search(this.conceptSearchInput.trim());
    }
  },
  data: {
    fuse: null,
    conceptSearchInput: '',
    handleAnchor: false,
    concepts: [],
    filteredConcepts: []
  },
  computed: {
    conceptGroups: function () {
       return _.uniq(this.filteredConcepts.map(concept => concept.conceptGroupLabel)).sort();
    }
  }
});

$(document).ready(function(){
  $('.concept-info .collapsible').collapsible({accordion: false});
});