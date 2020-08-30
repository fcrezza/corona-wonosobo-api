# Corona Wonosobo API

Web scrapping COVID-19 data in Wonosobo, source from [ https://corona.wonosobokab.go.id]( https://corona.wonosobokab.go.id)


## API Routes
- [/api](https://coronawonosobo-api.fcrezza.com/api) Data summary
- [/api/odr](https://coronawonosobo-api.fcrezza.com/api/odr) ODR data
- [/api/odp](https://coronawonosobo-api.fcrezza.com/api/odp) ODP data
- [/api/odr](https://coronawonosobo-api.fcrezza.com/api/pdp) PDP data
- [/api/positive](https://coronawonosobo-api.fcrezza.com/api/odr) Positive data
- [/api/regions](https://coronawonosobo-api.fcrezza.com/api/regions) Data summary in all regions
- [/api/regions/[:region]](https://coronawonosobo-api.fcrezza.com/api/regions/garung) Data per region

## Usage

 1. Clone the repository
    ```git clone https://github.com/fcrezza/corona-wonosobo-api.git```
 2. Install project dependecies using:
    ```npm install``` or ```yarn```
 3. Install [vercel](https://vercel.com/download) and login to vercel through [vercel CLI](https://vercel.com/docs/cli#commands/login) 
 4. Run ```vercel dev``` to run project on development mode, or ```vercel``` to deploy the project
 5. If you using chrome install [JSON formatter](https://chrome.google.com/webstore/detail/bcjindcccaagfpapjjmafapmmgkkhgoa), to get readable response (this step is optional)
