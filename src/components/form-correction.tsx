"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { correctUserForm, CorrectFormOutput } from '@/ai/flows/correct-form-flow';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Camera, CheckCircle, XCircle } from 'lucide-react';

const exercises = ["Push-up", "Squat", "Plank", "Lunge", "Bicep Curl"];

export function FormCorrection() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string>(exercises[0]);
  const [feedback, setFeedback] = useState<CorrectFormOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const { toast } = useToast();

  useEffect(() => {
    async function getCameraPermission() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    }
    getCameraPermission();

    return () => {
      stopDetection();
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const captureFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return null;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg');
    }
    return null;
  }, []);

  const analyzeFrame = useCallback(async () => {
    const imageDataUri = captureFrame();
    if (!imageDataUri) return;

    setIsAnalyzing(true);
    try {
      const result = await correctUserForm({ imageDataUri, exercise: selectedExercise });
      setFeedback(result);
    } catch (e) {
      console.error("Error analyzing frame:", e);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not get feedback from the AI. Please try again."
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [captureFrame, selectedExercise, toast]);


  const startDetection = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setFeedback(null);
    setIsDetecting(true);
    intervalRef.current = setInterval(analyzeFrame, 4000); // Analyze every 4 seconds
  };

  const stopDetection = () => {
    setIsDetecting(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="relative aspect-video">
             <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
             <canvas ref={canvasRef} className="hidden" />
             {isAnalyzing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                </div>
             )}
          </div>
          <div className="space-y-4">
             <CardTitle className="font-headline">Form Check</CardTitle>
            {hasCameraPermission === false && (
              <Alert variant="destructive">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  Please allow camera access in your browser to use this feature. You may need to refresh the page after granting permission.
                </AlertDescription>
              </Alert>
            )}

            {hasCameraPermission && (
              <>
                <Select onValueChange={setSelectedExercise} defaultValue={selectedExercise} disabled={isDetecting}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an exercise" />
                  </SelectTrigger>
                  <SelectContent>
                    {exercises.map(ex => (
                      <SelectItem key={ex} value={ex}>{ex}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isDetecting ? (
                  <Button onClick={stopDetection} variant="destructive" className="w-full">Stop Detection</Button>
                ) : (
                  <Button onClick={startDetection} className="w-full">
                    <Camera className="mr-2 h-4 w-4" /> Start Form Check
                  </Button>
                )}

                <div className="mt-4 p-4 border rounded-lg min-h-[100px] bg-muted/50 flex items-center justify-center">
                  {feedback ? (
                    <div className="text-center">
                      {feedback.isFormCorrect ? (
                        <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
                      ) : (
                        <XCircle className="h-10 w-10 text-destructive mx-auto mb-2" />
                      )}
                      <p className="font-semibold">{feedback.feedback}</p>
                    </div>
                  ) : (
                     <p className="text-muted-foreground text-center">
                        {isDetecting ? "Analyzing your form..." : "Click 'Start Form Check' to get real-time feedback."}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
