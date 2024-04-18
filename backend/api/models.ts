const SomeModelSchema = new mongoose.Schema({
    a_string: String,
    a_date: Date,
  });
const SomeModel = mongoose.model("SomeModel", SomeModelSchema);


async function createInstance() {

    await SomeModel.create({ name: "also_awesome" });
}


export default createInstance()