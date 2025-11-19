import { toast } from 'sonner';
import { Box, Button, Container, Grid, Text } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { TextInput, NativeSelect, DateInput } from '@/forms/elements';
import {
  bookingInitialValues,
  bookingSchema,
  type BookingFormType
} from './zod.booking';
import { useCreateBookingMutation } from '@/services/booking.service';

const BookingForm = () => {
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const methods = useForm<BookingFormType>({
    resolver: zodResolver(bookingSchema),
    defaultValues: bookingInitialValues
  });

  const { watch, reset } = methods;
  const bookingType = watch('bookingType');

  const onSubmit = async (data: BookingFormType) => {
    try {
      // Convert string date to ISO format
      const bookingData = {
        customerName: data.customerName,
        email: data.email,
        bookingDate: new Date(data.bookingDate).toISOString(),
        bookingType: data.bookingType,
        timeSlot:
          data.timeSlot && data.timeSlot.trim() !== ''
            ? (data.timeSlot as 'first_half' | 'second_half')
            : undefined
      };

      const result = await createBooking(bookingData).unwrap();

      if (result.success) {
        toast.success(result.message || 'Booking created successfully!');
        reset();
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to create booking';
      toast.error(errorMessage);
    }
  };

  return (
    <Box id="booking-form" py={50} px={{ base: 20, md: 50 }}>
      <Container size="full" mx="auto">
        <Text fz={{ base: 30, md: 44}} fw={700} ta="center" >
          Let's Make Your Booking Easy
        </Text>
        <Text c="dimmed" ta="center" mb="xl" fz='sm'>
          Please your provide the details to reserve your hotel
        </Text>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid>
              <Grid.Col span={12}>
                <TextInput
                  name="customerName"
                  label="Customer Name"
                  props={{
                    withAsterisk: true,
                    placeholder: 'Enter your full name'
                  }}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <TextInput
                  name="email"
                  label="Email"
                  props={{
                    withAsterisk: true,
                    type: 'email',
                    placeholder: 'Enter your email'
                  }}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <DateInput
                  name="bookingDate"
                  label="Booking Date"
                  props={{
                    withAsterisk: true,
                    minDate: new Date()
                  }}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <NativeSelect
                  name="bookingType"
                  label="Booking Type"
                  data={[
                    { value: 'fullday', label: 'Full Day' },
                    { value: 'halfday', label: 'Half Day' },
                    { value: 'custom', label: 'Custom' }
                  ]}
                  props={{
                    withAsterisk: true
                  }}
                />
              </Grid.Col>

              {(bookingType === 'halfday' || bookingType === 'custom') && (
                <Grid.Col span={12}>
                  <NativeSelect
                    name="timeSlot"
                    label="Time Slot"
                    data={[
                      {
                        value: 'first_half',
                        label: 'First Half ( 9AM to 2PM )'
                      },
                      {
                        value: 'second_half',
                        label: 'Second Half ( 3PM to 7PM )'
                      }
                    ]}
                    props={{
                      withAsterisk: true
                    }}
                  />
                </Grid.Col>
              )}

              <Grid.Col span={12} mt="md">
                <Button
                  w="100%"
                  h="auto"
                  type="submit"
                  p="sm"
                  color="black"
                  size="lg"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  <Text fz="lg" c="#FFF" fw={600}>
                    {isLoading ? 'Submitting...' : 'Submit Booking'}
                  </Text>
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </FormProvider>
      </Container>
    </Box>
  );
};

export default BookingForm;
