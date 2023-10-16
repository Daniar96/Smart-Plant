package guru.springframework.spring6restmvc.services;

import guru.springframework.spring6restmvc.mappers.MeasurementMapper;
import guru.springframework.spring6restmvc.model.MeasurementDto;
import guru.springframework.spring6restmvc.repositories.MeasurementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
@Primary
@RequiredArgsConstructor
public class MeasurementServiceJPA implements MeasurementService {

    private final MeasurementRepository measurementRepository;

    private final MeasurementMapper measurementMapper;
    @Override
    public List<MeasurementDto> listAllMeasurements() {
        return measurementRepository.findAll().stream()
                .map(measurementMapper::measurementToMeasurementDto).collect(Collectors.toList());
    }

    @Override
    public Optional<MeasurementDto> getMeasurementById(UUID measurementId) {
        return Optional.ofNullable(measurementMapper
                .measurementToMeasurementDto(measurementRepository.findById(measurementId).orElse(null)));
    }

    @Override
    public MeasurementDto saveNewMeasurement(MeasurementDto measurement) {
        return measurementMapper.measurementToMeasurementDto(measurementRepository
                .save(measurementMapper.measurementDtoToMeasurement(measurement)));
    }

    @Override
    public Boolean deleteMeasurementById(UUID measurementId) {
        if(measurementRepository.existsById(measurementId)){
            measurementRepository.deleteById(measurementId);
            return true;
        }
        return false;
    }

    @Override
    public Optional<MeasurementDto> patchMeasurementById(UUID measurementId, MeasurementDto measurement) {
        AtomicReference<Optional<MeasurementDto>> atomicReference = new AtomicReference<>();

        measurementRepository.findById(measurementId).ifPresentOrElse(foundMeasurement -> {
            if (measurement.getUv() != null){
                foundMeasurement.setUv(measurement.getUv());
            }
            if (measurement.getTemp() != null){
                foundMeasurement.setTemp(measurement.getTemp());
            }
            if (measurement.getHumidity() != null){
                foundMeasurement.setHumidity(measurement.getHumidity());
            }
            atomicReference.set(Optional.of(measurementMapper
                    .measurementToMeasurementDto((measurementRepository.save(foundMeasurement)))));
        }, () -> {
            atomicReference.set(Optional.empty());
        });

        return atomicReference.get();
    }
    }

