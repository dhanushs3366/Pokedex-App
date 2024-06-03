import * as tf from "@tensorflow/tfjs"
import {loadGraphModel} from '@tensorflow/tfjs-converter';

// Promise<tf.NamedTensorMap | tf.Tensor<tf.Rank> | tf.Tensor<tf.Rank>[]

export async function predict(tensor:tf.Tensor<tf.Rank>,modelPath:string): Promise<number>{
    await tf.ready();
    
    const model=await loadGraphModel(modelPath);

    const prediction=await model.predict(tensor) as tf.Tensor<tf.Rank>
    const pokemonId=(await prediction.as1D().argMax().data() as Int32Array)[0]+1;
    
    
    
    return pokemonId;
    
}

export async function imageToTensor(imageTag:HTMLImageElement) :Promise<tf.Tensor<tf.Rank>>{
    await tf.ready()
    const image=tf.browser.fromPixels(imageTag)
    
    const resizedTensor=tf.image.resizeBilinear(image,[64,64])
    const normalisedTensor=tf.div(resizedTensor,255.0);
    const finalTensor=tf.expandDims(normalisedTensor,0)

    return finalTensor
}
