Vue.component("concept-table", {
  props: ["concept", "owltype"],
  template:
    `
    <table class="responsive-table concept-table">
      <tbody>
        <tr>
          <td><strong>Term Name</strong></td>
          <td>{{ concept['@rdf:about'] }} </td>
        </tr>
        <tr>
          <td><strong>Label</strong></td>
          <td>{{ concept['rdfs:label']['#text'] }} </td>
        </tr>
        <tr>
          <td><strong>Controlled Value</strong></td>
          <td>{{ concept['@rdf:about'] }}</td>
        </tr>
        <tr>
          <td><strong>Defined By</strong></td>
          <td>{{ concept['rdfs:isDefinedBy']['@rdf:resource'] }}</td>
        </tr>
        <tr>
          <td><strong>Status</strong></td>
          <td>{{ concept['dwcattributes:status'] }}</td>
        </tr>
        <tr>
          <td><strong>Term IRI</strong></td>
          <td><a v-bind:href="concept['rdfs:isDefinedBy']['@rdf:resource']+concept['@rdf:about']">{{ concept['rdfs:isDefinedBy']['@rdf:resource']+concept['@rdf:about'] }}</a></td>
        </tr>
        <tr>
          <td><strong>Date Issued</strong></td>
          <td>{{ concept['dcterms:issued'] }}</td>
        </tr>
        <tr>
          <td><strong>Date Modified</strong></td>
          <td>{{ concept['dcterms:modified'] }}</td>
        </tr>
        <tr>
          <td><strong>Term Version IRI</strong></td>
          <td><a v-bind:href="concept['rdfs:isDefinedBy']['@rdf:resource']+'history/'+concept['@rdf:about']+'_'+concept['dcterms:modified']">{{ concept['rdfs:isDefinedBy']['@rdf:resource']+'history/'+concept['@rdf:about']+'_'+concept['dcterms:modified'] }}</a></td>
        </tr>
        <tr>
          <td><strong>Type</strong></td>
          <td>{{ owltype }}{{ concept.functional ? ', owl:FunctionalProperty' : '' }}</td>
        </tr>
        <tr v-if="owltype=='owl:Class' && typeof concept['rdfs:subClassOf'] != 'undefined'">
          <td><strong>Subclass Of</strong></td>
          <td><a v-bind:href="concept['rdfs:isDefinedBy']['@rdf:resource']+concept['rdfs:subClassOf']['@rdf:resource']">{{ concept['rdfs:isDefinedBy']['@rdf:resource']+concept['rdfs:subClassOf']['@rdf:resource'] }}</a></td>
        </tr>
        <tr v-if="owltype=='owl:ObjectProperty' || owltype=='owl:DatatypeProperty'">
          <td><strong>Has Domain</strong></td>
          <td>{{ concept['rdfs:domain']['@rdf:resource'] }}</td>
        </tr>
        <tr v-if="owltype=='owl:ObjectProperty' || owltype=='owl:DatatypeProperty'">
          <td><strong>Has Range</strong></td>
          <td>{{ concept['rdfs:range']['@rdf:resource'] }}</td>
        </tr>
        <tr v-if="owltype=='owl:NamedIndividual'">
          <td><strong>In Controlled Vocabulary</strong></td>
          <td>{{ concept['abcd:inVocabulary']['@rdf:resource'] }}</td>
        </tr>
        <tr>
          <td><strong>Comment</strong></td>
          <td>{{ concept['skos:definition'] }}</td>
        </tr>
      </tbody>
    </table>
    `
});

Vue.component("concept-card", {
  props: ["concept", "owltype"],
  template: 
    `
    <div class="card concept-card" v-bind:id="concept['@rdf:about']">
      <div class="card-content">
        <div class="card-title">
          <div class="concept-label">{{ concept['rdfs:label']['#text'] }}</div>
          <div class="concept-type">
            <div v-if="owltype=='owl:Class'"><span class="new badge red" data-badge-caption="Class"></span></div>
            <div v-if="owltype=='owl:ObjectProperty'"><span class="new badge blue" data-badge-caption="Object Property"></span></div>
            <div v-if="owltype=='owl:DatatypeProperty'"><span class="new badge orange" data-badge-caption="Datatype Property"></span></div>
            <div v-if="owltype!='owl:Class' && concept['functional']"><span class="new badge grey" data-badge-caption="Functional Property"></span></div>
            <div v-if="owltype=='owl:NamedIndividual'"><span class="new badge teal" data-badge-caption="Controlled Term"></span></div>
          </div>
        </div>
        <p class="concept-definition">{{ concept['rdfs:comment'] }}</p>
        <div class="concept-info">
          <ul class="collapsible">
            <li>
              <div class="collapsible-header"><i class="material-icons">info</i>More information</div>
              <div class="collapsible-body">
                <keep-alive>
                  <concept-table v-bind:concept="concept" v-bind:owltype="owltype"></concept-table>
                </keep-alive>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-action">
        <a class="waves-effect waves-light btn green" v-bind:href="'/terms/#'+concept['@rdf:about']">2019-01-31 (Current)</a>
      </div>
    </div>
    `
});

Vue.component("concept-list", {
  props: ["classes"],
  methods: {
    sortArrayConceptName(array){
      return _.orderBy(array, '@rdf:about', 'asc');
    },
  },
  template: 
    `
    <div class="concept-list">
      <a class="waves-effect waves-green btn-flat grey-text" v-for="concept in sortArrayConceptName(classes)" v-bind:href="'#' + concept.conceptName">{{ concept.conceptLabel }}</a>
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
        "@rdf:about",
        "rdfs:label.#text"
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
        url: '/chains/chain_and_mapping.json',
        async: false,
        success: function (json) {
          
          json["rdf:RDF"]["owl:Class"].map( concept => {
            concept.owltype="owl:Class";
            vinstance.concepts.push(concept);
          });

          var functionalProps = json["rdf:RDF"]["owl:FunctionalProperty"].map( concept => concept["@rdf:about"] );

          json["rdf:RDF"]["owl:DatatypeProperty"].map( concept => {
            concept.owltype = "owl:DatatypeProperty";
            concept.functional = functionalProps.includes(concept["@rdf:about"]); 
            concept["vann:termGroup"] = json["rdf:RDF"]["propertyConceptGroups"][concept["@rdf:about"]];
            vinstance.concepts.push(concept);
          });
          json["rdf:RDF"]["owl:ObjectProperty"].map( concept => {
            concept.owltype = "owl:ObjectProperty";
            concept.functional = functionalProps.includes(concept["@rdf:about"]); 
            concept["vann:termGroup"] = json["rdf:RDF"]["propertyConceptGroups"][concept["@rdf:about"]];
            vinstance.concepts.push(concept);
          });
          json["rdf:RDF"]["owl:NamedIndividual"].map( concept => {
            concept.owltype = "owl:NamedIndividual";
            concept['rdfs:label'] = {"@xml:lang": "en", "#text": concept["@rdf:about"]};
            concept.functional = functionalProps.includes(concept["@rdf:about"]); 
            concept["vann:termGroup"] = json["rdf:RDF"]["propertyConceptGroups"][concept["@rdf:about"]];
            vinstance.concepts.push(concept);
            console.log(concept);
          });

          vinstance.handleAnchor=true;
        }
      });
    },
    getConceptGroup(conceptGroup){
      groupConcepts = {};
      var filter = (concept) => {
        if(Array.isArray(concept["vann:termGroup"])) 
          return concept["vann:termGroup"].reduce((acc, group) => acc || group["@rdf:resource"] == conceptGroup, false);
        return concept["vann:termGroup"]["@rdf:resource"] == conceptGroup;
      };
      groupConcepts["owl:Class"] = _.sortBy(this.classes.filter(filter), '@rdf:about');
      groupConcepts["owl:ObjectProperty"] = _.sortBy(this.objectprops.filter(filter), '@rdf:about');;
      groupConcepts["owl:DatatypeProperty"] = _.sortBy(this.datatypeprops.filter(filter), '@rdf:about');;
      groupConcepts["owl:NamedIndividual"] = _.sortBy(this.controlledTerms.filter(filter), '@rdf:about');;
      return groupConcepts;
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
    filteredConcepts: [],
    objectProperties: [],
    datatypeProperties: [],
    namedIndividuals: []
  },
  computed: {
    classes: function() {
      return this.filteredConcepts.filter( concept => concept.owltype == "owl:Class");
    },
    objectprops: function() {
      return this.filteredConcepts.filter( concept => concept.owltype == "owl:ObjectProperty");
    },
    datatypeprops: function() {
      return this.filteredConcepts.filter( concept => concept.owltype == "owl:DatatypeProperty");
    },
    controlledTerms: function() {
      console.log("w");
      return this.filteredConcepts.filter( concept => concept.owltype == "owl:NamedIndividual");
    },
    conceptGroups: function () {
      console.log(this.controlledTerms);
      return _.uniq(this.filteredConcepts.map(concept => Array.isArray(concept["vann:termGroup"]) ? concept["vann:termGroup"].map(group => group["@rdf:resource"]) : concept["vann:termGroup"]["@rdf:resource"]).flat()).sort();
    }
  }
});

$(document).ready(function(){
  $('.concept-info .collapsible').collapsible({accordion: false});
});