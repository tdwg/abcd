# ABCD Interest Group Meeting 

2022-11-07 15:00 UTC (During TDWG Working Sessions week)

Short-Link to this document: <https://tinyurl.com/ABCD-IG2022> 

Video of the recording: <https://www.youtube.com/watch?v=F0i6CeaMa_g> 


## Attendees 

- David Fichtmueller (Botanic Garden and Botanical Museum, Berlin)
- Jörg Holetschek (Botanic Garden and Botanical Museum, Berlin)
- Anton Güntsch (Botanic Garden Berlin, Berlin)
- Jutta Buschbom (Statistical Genetics)
- Deborah Paul (UIUC, Species File Group, and TDWG)
- Caitlin Thorn (Museum für Naturkunde Berlin)
- Mathias Dillen (Meise Botanic Garden)
- Marcus Ernst (Botanic Garden and Botanical Museum, Berlin)
- Christian Bölling (Museum für Naturkunde Berlin)
- Steve Baskauf (Vanderbilt Heard Libraries, Nashville, Tennessee, USA)
- William Ulate (Missouri Botanical Garden)
- Sam Leeflang (Naturalis Biodiversity Center, Leiden)
- Brenda Daly (South African National Biodiversity Institute)
- Carlos Martínez (BIOfid, Senckenberg Frankfurt)


### Excused

- Andreas Altenburger (The Arctic University Museum of Norway)


## Agenda & Minutes

1. Welcome and Introduction

2. Status Report

   - Collaboration with Plinian Core for a recommendation to the TDWG TAG: [_Documenting XML Standards with the TDWG SDS_](https://docs.google.com/presentation/d/1Nnr2dQbBDlxDWEzIqg6YQLIka888sVwQIVpDOVR1tvU/edit)
   - Presentation at TDWG: [_State of the (Re-)Ratification of ABCD 2.06 and ABCD EFG under the SDS Guidelines_](https://biss.pensoft.net/article/93811/)


3. Modus Operandi of this group

   - status

     - It is currently listed as an Interest Group, it should be formally changed to a Maintenance Group for the ABCD standard.

   - members:

     - Members: Anton Güntsch, David Fichtmüller, Walter Berendsohn, Andreas Altenburger, William Ulate, Christian Bölling (with no fixed commitment yet)
     - Not everybody needs to be listed as a core member. Core Members should know the topics well enough to take over as host, if the convener is not available. Core members are mentioned in the charter, regular members can be mentioned somewhere else, e.g. the community page on Github.
     - Anton will approach several other people in order to increase participation from non-European countries
     -

   - more regular meetings: 

     - once a year is too little, 4 times a year might be too much
     - aim to have at least one additional meeting outside the TDWG working sessions week.

   - communication: 

     - We stay with the emails for now, maybe if a more group gets more active, we might consider other options, such has Github discussions (not yet enabled for the ABCD Github), dedicated mailing list or a channel in the TDWG slack.
     - Github repository: <https://github.com/tdwg/abcd> for documentation and issues for discussions about specific topics.

   - side discussion: how to generally keep informed about the things that happen in the different IGs/MGs/TGs

     - In general: watching the repositories. But the groups need to update their repos for changes. For instance post upcoming meeting as a Github issue, like the TAG, see <https://github.com/tdwg/tag/issues/35> . But this doesn’t substitute a reminder for the members via email.
     - Idea: a general newsletter from TDWG (2-4x a year) where the conveners of the TGs can report on things that are going on. Similar to the approach of the weekly newsletters from Wikidata: <https://www.wikidata.org/wiki/Wikidata:Status_updates/Next> . But this is something that the Outreach and Communications Groups needs to decide.

4. Updating the charter for the IG

   - <https://docs.google.com/document/d/17Xjtkuo-63ThlCkeab6hNSOtcTW1WOTEzGLV_8RvKYo/edit#> 
   - Needs to be cleaned up and rewritten to be handed to the Executive Committee. 

5. Interest Group report (due 2022-11-15)

   - <https://docs.google.com/document/d/1lKnuespkAYoTluOpzG0XnQo8Yfkdml-63I61QmWxumg/edit#> 

6. Definitions for missing terms

   - Here are several terms in ABCD 2.06 that don’t have a proper definition and for some of them it is not clear what the intent of the element was. If anybody knows enough about the subject matter to make a proper definition for those terms, please let us know.

    - Terms with missing definitions are: 


      - Unit/Gathering/SiteCoordinateSets/SiteCoordinates/@original
      - Unit/Gathering/SiteCoordinateSets/SiteCoordinates/@begin
      - Unit/Gathering/SiteCoordinateSets/SiteCoordinates/@end

      - Unit/CultureCollectionUnit/GrowthConditionAtomised/Aerobicity
      - Unit/CultureCollectionUnit/Applications
      - Unit/CultureCollectionUnit/Hazard


      - Unit/MycologicalUnit/MycologicalSexualStage

        cp. <https://docs.google.com/spreadsheets/d/1xUUDNd6XdH0g4QlfOQ7K-BpFcUffAB4PSOfMXOuKB4I/edit?usp=sharing> ?

    - Anton: It might be worth taking a look at the [BioCISE data model](https://www.bgbm.org/biodivinf/docs/CollectionModel/), as many of the initial concepts from ABCD are stamming from there. 

7. Review of current Github issues: <https://github.com/tdwg/abcd/issues> 

   - [#15](https://github.com/tdwg/abcd/issues/15): ABCD 3 should be extended with these three additional terms "RockSpecimen", "MineralSpecimen", "MeteoriteSpecimen". “Unspecified” would be a loophole to avoid the mandatory status.

     - Historically validation of the fields was purposefully not enforced, as the goal was to mobilize as much data as possible.
     - It should be discussed in combination with ABCD-EFG
     - JuB: Consider getting in contact with the MaterialSamples group, we are currently working on vocabularies.
